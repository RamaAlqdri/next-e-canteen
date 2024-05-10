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
  params: { productId: string; canteenId: string };
}) {

    console.log(params);

    const product = await productsService.getProductById(params.canteenId, params.productId);
    return <Form product={product} canteenId={params.canteenId}/>
}