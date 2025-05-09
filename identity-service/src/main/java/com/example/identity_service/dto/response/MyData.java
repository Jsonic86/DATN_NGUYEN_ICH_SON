package com.example.identity_service.dto.response;

import com.opencsv.bean.CsvBindByName;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level=AccessLevel.PRIVATE)
public class MyData {
    @CsvBindByName(column = "Danh mục")
    private String categoryName;

    @CsvBindByName(column = "Tên sản phẩm")
    private String productName;

    @CsvBindByName(column = "Giá")
    private BigDecimal price;

    @CsvBindByName(column = "Ảnh")
    private String imageUrl;

    @CsvBindByName(column = "Thông số kỹ thuật")
    private String description;

    @CsvBindByName(column = "Số lượng")
    private int stockQuantity;
}
