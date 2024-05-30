import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getServerSession } from 'next-auth';
import { authOptions } from '../utils/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoginForm } from '@/components/Auth/LoginForm';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
    title: `${siteConfig.name} | Connexion`,
    description: siteConfig.description,
};

export default async function page() {
    const session = await getServerSession(authOptions);

    if(session){
        return redirect('/')
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className='w-1/3'>
                <CardHeader>
                    <CardTitle>Se connecter</CardTitle>
                    <CardDescription>To access the private page</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col space-y-4'>
                        <LoginForm />

                        <Link 
                            className={cn(buttonVariants({ variant: "secondary" }))}
                            href="/register">
                            S'inscrire
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
