package com.example.identity_service.controller;

import com.example.identity_service.dto.response.ApiResponse;
import com.example.identity_service.dto.response.MyData;
import com.example.identity_service.entity.Category;
import com.example.identity_service.entity.Product;
import com.example.identity_service.repository.CategoryRepository;
import com.example.identity_service.repository.ProductRepository;
import com.opencsv.CSVReader;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CSVUploadController {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/upload-csv")
    public ApiResponse<?> uploadCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ApiResponse.builder()
                    .result("file is empty")
                    .message("file is empty")
                    .code(1001)
                    .build();
        }

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<MyData> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(MyData.class);

            CsvToBean<MyData> csvToBean = new CsvToBeanBuilder<MyData>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreLeadingWhiteSpace(true)
                    .withThrowExceptions(false)
                    .build();


            List<MyData> dataList = csvToBean.parse();

            for(MyData myData : dataList) {
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
            return ApiResponse.builder()
                    .result(dataList)
                    .message("Import thành công")
                    .code(1000)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.builder()
                    .result(null)
                    .message("Lỗi khi đọc file")
                    .code(1002)
                    .build();
        }
    }

}
