import {Metadata} from 'next'
import Form from './Form'

export const metadata: Metadata = {
    title: 'Permintaan Kantin',
}
export default async function CanteenRequest({
    params,
  }: {
    params: { requestId: string };
  }) {
    return <Form requestId={params.requestId}/>
}