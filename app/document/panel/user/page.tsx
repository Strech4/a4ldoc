import { authOptions } from '@/app/utils/auth';
import { Block } from '@/components/basic/Block';
import { RoleManager } from '@/components/pannel/adminForm/RoleManager';
import { AllUser } from '@/components/pannel/UserManager/AllUser';
import { checkUserRole } from '@/server-actions/Utils-Action';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.name} | User Manager`,
  description: siteConfig.description,
};


export default async function page() {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect("/");
        return null;
    }

    const isDev = await checkUserRole((session?.user as { id: string }).id, 'dev');

    if (!isDev) {
        redirect("/");
        return null;
    }

  return (
    <section className='grid grid-cols-12'>
        <Block className='col-span-12 md:col-span-12 border-b'>
            <h1 className='text-2xl font-medium text-center'>Gestion des utilisateurs</h1>
        </Block>
        <RoleManager />
        <AllUser />
    </section>
  )
}
