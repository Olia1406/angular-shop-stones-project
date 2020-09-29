import { IOrder } from '../interfaces/order.interface';
import { IProduct } from '../interfaces/product.interface';
export class Order implements IOrder {
    constructor(
        public id: number,
        public userName: string,
        public userPhone: string,
        public userComment: string,
        public userDelivery: string,
        public userCity: string,
        public deliveryDepartment: string,
        public userPaymentType: string,
        public totalPayment: number,
        public productOrder: Array<IProduct>,
        public dateOrder: any,
        public statusOrder: string = 'в обробці',
        public userOrderEmail?: string
    ) {}
}
