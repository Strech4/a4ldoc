"use client"
import { Block } from '@/components/basic/Block'
import { SubmitButton } from '@/components/basic/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { RoleManagerAction } from '@/server-actions/RoleManagerAction'
import { getAllRoles } from '@/server-actions/Utils-Action'
import React, { FormEventHandler, useEffect, useState } from 'react'

export const RoleManager = () => {

    const [roles, setRoles] = useState<{ id: string; name: string; }[]>([]);

    useEffect(() => {
        const fetchCarTypes = async () => {
            try {
                const fetchedCarTypes = await getAllRoles();
                setRoles(fetchedCarTypes);
            } catch (error) {
                console.error("Erreur lors de la récupération des types de voiture:", error);
            }
        };

        fetchCarTypes();
    }, []);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const res = await RoleManagerAction(formData);

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
        <Block className='col-span-12 md:col-span-4 '>
            <form onSubmit={onSubmit} className='space-y-4'>
                <Label className='text-center'>Ajouter un rôle</Label>
                <Input type='email' name='email' placeholder='Email du membre' />
                <Select name='role'>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map(item => (
                            <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <SubmitButton className='w-full'>Ajouter le rôle</SubmitButton>
            </form>
        </Block>
    )
}
