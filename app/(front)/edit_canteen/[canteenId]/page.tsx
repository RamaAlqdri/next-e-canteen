import { Metadata } from 'next'
import Form from './Form'
import canteenService from '@/lib/services/canteenService';


export async function generateMetadata({
    params,
  }: {
    params: { canteenId: string };
  }) {
    const canteen = await canteenService.getCanteenData(params.canteenId);
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
    params: { canteenId: string };
  }) {
    const canteen = await canteenService.getCanteenData(params.canteenId);
    return <Form canteen={canteen}/>
}