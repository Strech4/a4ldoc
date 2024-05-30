import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../utils/auth';
import { redirect } from 'next/navigation';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `${siteConfig.name} | Inscription`,
    description: siteConfig.description,
};

export default async function page() {

    const session = await getServerSession(authOptions);

    if(session) {
        redirect('/')
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className='w-1/3'>
                <CardHeader>
                    <CardTitle>Crée un compte</CardTitle>
                    <CardDescription>Rejoignez notre communauté dès aujourd'hui.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-4'>
                        <RegisterForm />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
