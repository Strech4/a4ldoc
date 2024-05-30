import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { LogoutButton } from '../Auth/LogoutButton'
import Image from 'next/image'
import Logo from "@/public/a4LHorizon.png"
import { checkUserRole } from '@/server-actions/Utils-Action'

export const NavBar = async () => {

    const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between p-3 border-b border-border shadow-sm'>
        <div className='flex items-center'>
            <Link href="/" className='text-xl font-medium'>
                <Image 
                    src={Logo}
                    alt='Logo de arma for life'
                    width={90}
                    quality={100}
                    priority
                    className=''
                />
            </Link>
        </div>
        <MainNav /> 
        {session ? (
            <div className='flex items-center space-x-5'>
                <AdminPanel />
                <LogoutButton />
            </div>
        ) : (
            <div className='items-center space-x-2 md:space-x-5'>
                <Link className={cn(buttonVariants({ variant: "default" }))} href='/auth'>
                    Connexion
                </Link>

                <Link className={cn(buttonVariants({ variant: "outline" }))} href='/register'>
                    Inscription
                </Link>
            </div>
        )}
    </nav>
  )
}

const MainNav = () => {
    return (
        <div className='flex place-content-center'>
            <Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
                Accueil
            </Link>
            <Link href="/document" className={cn(buttonVariants({ variant: "link" }))}>
                Document
            </Link>
        </div>
    )
}

export const AdminPanel = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as { id: string }).id) {
        return null; // Ne pas afficher si aucune session ou ID utilisateur n'est trouvé
    }

    // Vérifiez si l'utilisateur est un administrateur
    const isAdmin = await checkUserRole((session?.user as { id: string }).id, 'admin') || await checkUserRole((session?.user as { id: string }).id, 'dev');
    if (!isAdmin) {
        return null; // Ne pas afficher si l'utilisateur n'est pas un administrateur
    }

    return (
        <div className='flex justify-between'>
            <div></div>
            <Link className={cn(buttonVariants({ variant: 'outline' }))} href="/document/panel">
                Admin panel
            </Link>
        </div>
    );
}
