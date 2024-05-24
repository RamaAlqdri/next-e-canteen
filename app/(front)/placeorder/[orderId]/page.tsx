import {Metadata} from 'next'
import Form from './Form'

export default async function PalceOrderPage({
    params,
  }: {
    params: { orderId: string };
  }) {
    return <Form orderId={params.orderId}/>
}