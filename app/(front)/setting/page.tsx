import {Metadata} from 'next'
import Form from './Form'
import ordersService from '@/lib/services/orderService';

export const metadata: Metadata = {
    title: 'Pengaturan',
}
export default async function Setting() {




    return <Form />
}