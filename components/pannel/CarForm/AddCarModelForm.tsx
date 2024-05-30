"use client"
import { Block } from '@/components/basic/Block'
import { SubmitButton } from '@/components/basic/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { addModelAction } from '@/server-actions/CarAction'
import { useRouter } from 'next/navigation'
import React, { FormEventHandler } from 'react'

export const AddCarModelForm = () => {
    const router = useRouter();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form);

        const res = await addModelAction(formData);

        if (res.error) {
            toast({
                title: "Erreur",
                description: res.error,
                variant: "default",
            })
        } else {
            form.reset();
            return toast({
                title: "Réussi",
                description: res.success,
                variant: "default",
            })
        }

    }

    return (
        <Block className='col-span-12 md:col-span-4 space-y-2'>
            <form
                className='space-y-2'
                onSubmit={onSubmit}
            >
                <Label>
                    Ajouter un modèle de véhicule
                </Label>
                <Input type='text' name='name' placeholder='Nom du modèle' />

                <SubmitButton className='w-full'>Ajouter le modèle</SubmitButton>
            </form>
        </Block>
    )
}
