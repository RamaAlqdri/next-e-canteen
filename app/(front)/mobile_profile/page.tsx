import { Metadata } from 'next'
import Detail from './Detail'

export const metadata: Metadata = {
    title: 'Sign in',
}

export default async function Profil(){
    return <Detail />
}