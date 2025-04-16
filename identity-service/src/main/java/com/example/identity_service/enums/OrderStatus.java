package com.example.identity_service.enums;

public enum OrderStatus {
    CHỜ_XỬ_LÝ("Chờ xử lý"),
    ĐANG_GIAO("Đang giao"),
    HOÀN_THÀNH("Hoàn thành"),
    ĐÃ_HỦY("Đã hủy");

    private final String value;

    OrderStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
