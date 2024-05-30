"use client"
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

export const LoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState<null | string>(null)
    const [password, setPassword] = useState<null | string>(null)
    const [error, setError] = useState<null | string>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res: any = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (res.ok) {
                router.push("/")
                router.refresh()
                return toast({
                    title: "✅ Success",
                    description: "Vous êtes maintenant connecté",
                    variant: "default",
                })
            }

            if (res.error) {
                console.log("Here")
                return toast({
                    title: "❌ Erreur",
                    description: "Erreur lors de la conection avec le serveur. Vérifier vos informations",
                    variant: "default",
                })
            }

        } catch (error) {
            console.log(error);
            return toast({
                title: "❌ Erreur",
                description: "Erreur lors de la conection avec le serveur. reessayer plsu tard",
                variant: "default",
            })
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-2">
                <Input
                    name="email"
                    type="email"
                    placeholder="name@exemple.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button type="submit" className="mt-4 w-full">Se connecter</Button>
        </form>
    )
}
