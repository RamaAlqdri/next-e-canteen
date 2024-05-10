import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
    title: 'Make Canteen',
}

export default async function AddProduct({
    params,
  }: {
    params: { canteenId: string };
  }) {
    return <Form  canteenId={params.canteenId}/>
}