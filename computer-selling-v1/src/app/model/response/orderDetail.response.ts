import { ProductItemResponse } from "./product.response"

export interface OrderDetail {
    id: number
    product: ProductItemResponse
    quantity: number
    unitPrice: number
    totalPrice: number
}