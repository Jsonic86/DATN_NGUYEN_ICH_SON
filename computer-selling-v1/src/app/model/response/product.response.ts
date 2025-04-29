import { Category } from "./category.response"

export interface ProductItemResponse {
    productId: number
    productName: string
    category: Category
    description: string
    price: number
    stockQuantity: number
    imageUrl: string
    createdAt: string
    promotion: any
    categoryName: string
    categoryId: string
}