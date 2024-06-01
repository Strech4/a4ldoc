import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { LogoutDropDown } from '../Auth/LogoutButton'
import Image from 'next/image'
import Logo from "@/public/a4LHorizon.png"
import { checkUserRole } from '@/server-actions/Utils-Action'
import { ModeToggle } from './ModeToggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'


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
                    <UserDropDown />
                    <ModeToggle />
                </div>
            ) : (
                <div className='flex items-center space-x-2 md:space-x-5'>
                    <Link className={cn(buttonVariants({ variant: "default" }))} href='/auth'>
                        Connexion
                    </Link>

                    <Link className={cn(buttonVariants({ variant: "outline" }))} href='/register'>
                        Inscription
                    </Link>
                    <ModeToggle />
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
                Catalogues
            </Link>
        </div>
    )
}

const AdminPanel = async () => {
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
        <DropdownMenuItem>
            <Link  href="/document/panel">
                Admin panel
            </Link>
        </DropdownMenuItem>
    );
}

const UserDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center space-x-2'>
                <Avatar className='size-8'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='text-sm'>
                    Name
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Name</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <AdminPanel />
                <DropdownMenuSeparator />
                <LogoutDropDown />
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

