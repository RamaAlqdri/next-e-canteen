import {Metadata} from 'next'
import Form from './Form'
import ordersService from '@/lib/services/orderService';

export const metadata: Metadata = {
    title: 'Pesanan',
}
export default async function PalceOrderPage({
    params,
  }: {
    params: { orderId: string };
  }) {

    // const order = await ordersService.getOrderById(params.orderId);


    return <Form orderId={params.orderId}/>
}