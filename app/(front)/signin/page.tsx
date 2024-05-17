import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
    title: 'Masuk',
}

export default async function Signin(){
    return <Form />
}