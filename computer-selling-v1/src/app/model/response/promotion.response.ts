import { ProductItemResponse } from "./product.response"

export interface Promotion {
    promotionId: number
    name: string
    description: string
    discountPercent: number
    discountAmount: number
    startDate: string
    endDate: string
    status: string
    product: ProductItemResponse
}
export interface PromotionById {
    promotionId: number
    name: string
    description: string
    discountPercent: number
    discountAmount: number
    startDate: string
    endDate: string
    status: string
}