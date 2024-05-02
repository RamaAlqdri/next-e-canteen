import { Metadata } from 'next'
import Form from './Form'
import canteenService from '@/lib/services/canteenService';


export async function generateMetadata({
    params,
  }: {
    params: { canteenSlug: string };
  }) {
    const canteen = await canteenService.getCanteenBySlug(params.canteenSlug);
    if (!canteen) {
      return { title: "Product not Found" };
    }
    return {
      title: `Sunting ${canteen.name}`,
    };
  }

  export default async function EditCanteen({
    params,
  }: {
    params: { canteenSlug: string };
  }) {
    const canteen = await canteenService.getCanteenBySlug(params.canteenSlug);
    return <Form canteen={canteen}/>
}