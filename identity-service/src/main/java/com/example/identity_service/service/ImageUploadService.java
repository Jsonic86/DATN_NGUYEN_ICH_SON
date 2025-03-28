package com.example.identity_service.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class ImageUploadService {
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    public String uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File không hợp lệ hoặc trống!");
        }

        try {
            // Tạo thư mục nếu chưa tồn tại
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Tạo tên file duy nhất
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Lưu file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Trả về đường dẫn ảnh
            return  fileName;
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage(), e);
        }
    }
}
