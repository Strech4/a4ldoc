"use client"
import { RegisterUser } from '@/server-actions/RegisterAction'
import { FormEventHandler } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
    const router = useRouter();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form);

        const res = await RegisterUser(formData);

        if(res.error) {
            toast({
                title: "res.error",
                description: res.error,
                variant: "default",
            })
        } else {
            router.push("/auth")
            router.refresh()
            return toast({
                title: "res.success",
                description: res.success,
                variant: "default",
            })
        }

    }

    return (
        <form onSubmit={onSubmit} >

            <div className="flex flex-col gap-y-2">
                <div className='flex space-x-2'>
                    <Input
                        name="surname"
                        type="text"
                        placeholder="Prénom"
                    />
                    <Input
                        name="name"
                        type="text"
                        placeholder="Nom"
                    />
                </div>
                <Input
                    name="email"
                    type="email"
                    placeholder="name@exemple.com"
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    autoComplete='new-password'
                />
                <Input
                    name="Confpassword"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete='new-password'
                />
            </div>
            <Button type="submit" className="mt-4 w-full">S'inscrire</Button>

        </form>
    )
}
