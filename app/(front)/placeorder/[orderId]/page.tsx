import {Metadata} from 'next'
import Form from './Form'
import ordersService from '@/lib/services/orderService';
import canteenService from '@/lib/services/canteenService';
import userService from '@/lib/services/userService';

export const metadata: Metadata = {
    title: 'Pesanan',
}
export default async function PalceOrderPage({
    params,
  }: {
    params: { orderId: string };
  }) {

    
    const order = await ordersService.getOrderById(params.orderId);
    const canteen = await canteenService.getCanteenData(order.canteenId);
    const user = await userService.getUserDataById(order.customerId);
    // const order = await ordersService.getOrderById(params.orderId);


    return <Form orderId={params.orderId} canteen={canteen} user={user}/>
}