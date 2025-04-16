package com.example.identity_service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Exception", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User already existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1002, "User name must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1003, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1004, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1005, "You do not have permission", HttpStatus.FORBIDDEN),
    PERMISSION_NOT_EXISTED(1006, "Permission not existed", HttpStatus.NOT_FOUND),
    ROLE_NOT_EXISTED(1007, "Permission not existed", HttpStatus.NOT_FOUND),
    INVALID_DOB(1008, "your age be at least {min}", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_EXISTED(1009, "Product not existed", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_EXISTED(1010, "Category not existed", HttpStatus.NOT_FOUND),
    SUPPLIER_NOT_EXISTED(1011, "Supplier not existed", HttpStatus.NOT_FOUND),
    CATEGORY_LINK_PRODUCT(1012, "Category is existed in some products", HttpStatus.BAD_REQUEST),
    ORDER_ITEM_EMPTY(1013,"Order must contain at least one item", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }

    private int code;
    private String message;
    private HttpStatusCode httpStatusCode;
}
