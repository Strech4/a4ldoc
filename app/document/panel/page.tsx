import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../../utils/auth';
import { redirect } from 'next/navigation';
import { AddCarModelForm } from '@/components/pannel/CarForm/AddCarModelForm';
import { AddCarForm } from '@/components/pannel/CarForm/AddCarForm';
import { ResumeData } from '@/components/pannel/ResumeData';
import { checkUserRole } from '@/server-actions/Utils-Action';
import { Block } from '@/components/basic/Block';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.name} | Admin Panel`,
  description: siteConfig.description,
};


export default async function Panel() {
    const session = await getServerSession(authOptions);

    // Redirige si aucune session n'est trouvée
    if (!session) {
        redirect("/");
        return null;
    }

    // Vérifie si l'utilisateur est un admin
    const isAdmin = await checkUserRole((session?.user as { id: string }).id, 'admin');
    if (!isAdmin) {
        redirect("/");
        return null;
    }

    const isDev = await checkUserRole((session?.user as { id: string }).id, 'dev');

    return (
        <section className='grid grid-cols-12 gap-4 p-4'>
            <Block className='col-span-12 md:col-span-12 border-b'>
                <h1 className='text-3xl font-medium text-center'>Admin Panel</h1>
            </Block>
            {isDev && (
                <Block className='col-span-12 md:col-span-12 border-b p-0 pb-4'>
                    <Link 
                        className={cn(buttonVariants({ variant: 'default' }))}
                        href='/document/panel/user'
                    >
                        User Manager
                    </Link>
                </Block>
            )}
            {/* <ResumeData /> */}
            <AddCarForm />
            <AddCarModelForm />
        </section>
    )
}
