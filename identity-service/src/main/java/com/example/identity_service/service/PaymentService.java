package com.example.identity_service.service;

import com.example.identity_service.dto.request.PaymentRequest;
import com.example.identity_service.dto.response.PaymentResponse;
import com.example.identity_service.entity.Order;
import com.example.identity_service.entity.Payment;
import com.example.identity_service.enums.PaymentStatus;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.PaymentMapper;
import com.example.identity_service.repository.OrderRepository;
import com.example.identity_service.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentMapper paymentMapper;

    public Void updatePaymentStatus(Integer orderId,PaymentStatus status) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new AppException(ErrorCode.ORDER_ITEM_EMPTY)
        );

        Payment payment = order.getPayment();
        payment.setPaymentStatus(status);
        paymentRepository.save(payment);
        return null;
    }
    private static final String SECRET_KEY = "2R8AU1QUMXSFCY58914ODOVZGWM1NNSX";
    private static final String VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

    public String createPaymentUrl(String orderInfo, Long amount, String returnUrl) {
        // Tạo mã giao dịch duy nhất
        String txnRef = String.valueOf(System.currentTimeMillis());

        // Định dạng ngày tháng theo yêu cầu của VNPay
        LocalDateTime now = LocalDateTime.now();
        String createDate = now.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        // Tính toán thời gian hết hạn (15 phút sau thời gian tạo)
        LocalDateTime expireDate = now.plusMinutes(15);
        String expireDateTime = expireDate.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        // Dữ liệu đầu vào
        Map<String, String> params = new HashMap<>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", "WXQT0FZU");
        params.put("vnp_Amount", String.valueOf(amount * 100)); // Số tiền * 100 (VNPay yêu cầu)
        params.put("vnp_BankCode", "NCB");
        params.put("vnp_CreateDate", createDate);
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_IpAddr", "127.0.0.1");
        params.put("vnp_Locale", "vn");
        params.put("vnp_OrderInfo", URLEncoder.encode(orderInfo, StandardCharsets.UTF_8));
        params.put("vnp_OrderType", "other");
        params.put("vnp_ReturnUrl", URLEncoder.encode(returnUrl, StandardCharsets.UTF_8));
        params.put("vnp_TxnRef", txnRef);
        params.put("vnp_ExpireDate", expireDateTime);

        // Tạo chuỗi query đã được sắp xếp
        String queryString = createQueryString(params);

        // Tạo chữ ký bảo mật
        String secureHash = createSecureHash(queryString, SECRET_KEY);

        // Thêm vnp_SecureHash vào URL
        return VNPAY_URL + "?" + queryString + "&vnp_SecureHash=" + secureHash;
    }
    private String createSecureHash(String data, String secretKey) {
        try {
            Mac sha512Hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            sha512Hmac.init(secretKeySpec);

            byte[] hashBytes = sha512Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error creating secure hash", e);
        }
    }

    private String bytesToHex(byte[] hashBytes) {
        StringBuilder hexString = new StringBuilder(2 * hashBytes.length);
        for (byte b : hashBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString().toUpperCase();  // Chữ ký phải được chuyển sang chữ hoa
    }
    private String createQueryString(Map<String, String> params) {
        StringBuilder queryString = new StringBuilder();
        params.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())  // Sắp xếp theo tên tham số
                .forEach(entry -> {
                    try {
                        queryString.append(entry.getKey())
                                .append("=")
                                .append(entry.getValue())
                                .append("&");
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });

        // Loại bỏ dấu "&" cuối cùng
        if (queryString.length() > 0) {
            queryString.setLength(queryString.length() - 1);
        }
        return queryString.toString();
    }
}
