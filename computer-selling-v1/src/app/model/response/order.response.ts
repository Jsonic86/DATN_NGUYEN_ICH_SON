import { OrderDetail } from "./orderDetail.response"
import { Payment } from "./payment.response"
import { Shipment } from "./shipment.response"

export interface Order {
    orderId: number
    orderDate: string
    totalAmount: number
    status: string
    orderDetails: OrderDetail[]
    customerId: number
    payment: Payment
    shipmentAddress: Shipment
}