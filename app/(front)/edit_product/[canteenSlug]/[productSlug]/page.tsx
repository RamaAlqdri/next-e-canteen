import { Metadata } from 'next'
import Form from './Form'
import productsService from '@/lib/services/productService';
import canteenService from '@/lib/services/canteenService';

export const metadata: Metadata = {
    title: 'Sunting Produk',
}

export default async function EditProduct({
    params,
}: {
  params: { productSlug: string; canteenSlug: string };
}) {

    console.log(params);
    const canteenId = await canteenService.getCanteenIdBySlug(params.canteenSlug);
    const product = await productsService.getProductBySlug(canteenId, params.productSlug);
    return <Form product={product}/>
}