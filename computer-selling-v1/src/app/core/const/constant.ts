export enum StatusResponse {
    OK = 1000,
}
export const TITLE = {
    USER: 'Quản lý tài khoản',
    PRODUCT: 'Quản lý sản phẩm',
    CATEGORY: 'Quản lý danh mục',
    SUPPLIER: 'Quản lý nhà cung cấp',
}
export const TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    DATE: 'date',
    BOOLEAN: 'boolean',
    IMAGE: 'image',
    CURRENCY: 'currency',
    ACTION: 'action',
    SELECT: 'select',
}
export const USER_TYPE = {
    CUSTOMER: 'CUSTOMER',
    EMPLOYEE: 'EMPLOYEE'
}
export const STATUS: { [key: string]: string } = {
    CHỜ_XỬ_LÝ: 'Chờ xử lý',
    ĐANG_GIAO: 'Đang giao',
    HOÀN_THÀNH: 'Hoàn thành',
    ĐÃ_HỦY: 'Đã hủy'
}