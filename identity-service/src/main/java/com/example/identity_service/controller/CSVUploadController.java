package com.example.identity_service.controller;

import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.MyData;
import com.example.identity_service.entity.Category;
import com.example.identity_service.entity.Product;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.repository.ProductRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CSVUploadController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/upload-file")
    public ApiResponse<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ApiResponse.builder()
                    .result("file is empty")
                    .message("file is empty")
                    .code(1001)
                    .build();
        }

        try {
            String filename = file.getOriginalFilename();
            if (filename != null && filename.endsWith(".csv")) {
                return handleCSV(file);
            } else if (filename != null && (filename.endsWith(".xlsx") || filename.endsWith(".xls"))) {
                return handleExcel(file);
            } else {
                return ApiResponse.builder()
                        .result(null)
                        .message("Unsupported file format")
                        .code(1003)
                        .build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.builder()
                    .result(null)
                    .message("Lỗi khi đọc file")
                    .code(1002)
                    .build();
        }
    }

    private ApiResponse<?> handleCSV(MultipartFile file) throws Exception {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<MyData> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(MyData.class);

            CsvToBean<MyData> csvToBean = new CsvToBeanBuilder<MyData>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            List<MyData> dataList = csvToBean.parse();
            saveToDatabase(dataList);

            return ApiResponse.builder()
                    .result(dataList)
                    .message("Import CSV thành công")
                    .code(1000)
                    .build();
        }
    }

    private ApiResponse<?> handleExcel(MultipartFile file) throws Exception {
        List<MyData> dataList = new ArrayList<>();
        DataFormatter formatter = new DataFormatter();

        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            int rowIndex = 0;

            for (Row row : sheet) {
                if (rowIndex++ == 0) continue; // Bỏ qua dòng header

                String productName = getSafeStringCell(row, 0, formatter);
                String priceStr = getSafeStringCell(row, 1, formatter);
                String stockStr = getSafeStringCell(row, 2, formatter);
                String imageUrl = getSafeStringCell(row, 3, formatter);
                String description = getSafeStringCell(row, 4, formatter);
                String categoryName = getSafeStringCell(row, 5, formatter);

                if (productName.isEmpty()) continue; // Bỏ qua dòng nếu không có tên sản phẩm

                BigDecimal price = priceStr.isEmpty() ? BigDecimal.ZERO : new BigDecimal(priceStr.replace(",", ""));
                int stock = stockStr.isEmpty() ? 0 : (int) Double.parseDouble(stockStr);

                MyData data = new MyData();
                data.setProductName(productName);
                data.setPrice(price);
                data.setStockQuantity(stock);
                data.setImageUrl(imageUrl);
                data.setDescription(description);
                data.setCategoryName(categoryName);

                dataList.add(data);
            }

            saveToDatabase(dataList);
        }

        return ApiResponse.builder()
                .result(dataList)
                .message("Import Excel thành công")
                .code(1000)
                .build();
    }

    private String getSafeStringCell(Row row, int index, DataFormatter formatter) {
        Cell cell = row.getCell(index);
        return (cell == null) ? "" : formatter.formatCellValue(cell).trim();
    }

    private void saveToDatabase(List<MyData> dataList) {
        for (MyData myData : dataList) {
            Category category = categoryRepository.findByCategoryName(myData.getCategoryName());
            Product product = Product.builder()
                    .price(myData.getPrice())
                    .productName(myData.getProductName())
                    .imageUrl(myData.getImageUrl())
                    .stockQuantity(myData.getStockQuantity())
                    .category(category)
                    .description(myData.getDescription())
                    .build();
            productRepository.save(product);
        }
    }
}
