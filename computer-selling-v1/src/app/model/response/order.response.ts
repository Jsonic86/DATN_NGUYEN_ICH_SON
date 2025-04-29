import { OrderDetail } from "./orderDetail.response"

export interface Order {
    orderId: number
    orderDate: string
    totalAmount: number
    status: string
    orderDetails: OrderDetail[]
    customerId: number
}