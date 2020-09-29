import { IProduct } from './product.interface';
export interface IOrder {
    id: number;
    userName: string;
    userPhone: string;
    userComment: string;
    userDelivery: string;
    userCity: string;
    deliveryDepartment: string;
    userPaymentType: string;
    totalPayment: number;
    productOrder: Array<IProduct>;
    dateOrder: any;
    statusOrder: string;
    userOrderEmail?: string;
}
