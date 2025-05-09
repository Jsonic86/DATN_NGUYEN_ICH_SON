// gẻnerate typescript interface from json
// "payment": {
//     "id": 12,
//     "paymentMethod": "TIEN_MAT",
//     "paymentStatus": "CHUA_THANH_TOAN",
//     "paymentDate": null
// },
export interface Payment {
    id: number;
    paymentMethod: string;
    paymentStatus: string;
    paymentDate: Date | null;
}