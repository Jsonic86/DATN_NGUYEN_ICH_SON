export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    userName: string;
    productId: string;
    checked?: boolean;
}