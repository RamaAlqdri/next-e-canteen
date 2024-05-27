import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
    title: 'Lupa Kata Sandi',
}

export default async function ForgotPassword(){
    return <Form />
}