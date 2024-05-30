"use client"
import { Block } from '@/components/basic/Block'
import { SubmitButton } from '@/components/basic/SubmitButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect, FormEventHandler } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addCarAction, getCartTypeAction } from '@/server-actions/CarAction'
import { toast } from '@/components/ui/use-toast'

export const AddCarForm = () => {
    const [carTypes, setCarTypes] = useState<{ id: string; name: string; }[]>([]);

    useEffect(() => {
        const fetchCarTypes = async () => {
            try {
                const fetchedCarTypes = await getCartTypeAction();
                setCarTypes(fetchedCarTypes);
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

        const res = await addCarAction(formData);

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

    };

    return (
        <Block className='col-span-12 md:col-span-4'>
            <form className='space-y-2' onSubmit={onSubmit}>
                <Label className=''>Ajouter un véhicule</Label>
                        <Input type='text' name='name' placeholder='Nom du véhicule' />
                        <Select name='carType'>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Modèle du véhicule" />
                            </SelectTrigger>
                            <SelectContent>
                                {carTypes.map(item => (
                                    <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input type='number' name='price' placeholder='Prix' />
                        <Input type='number' name='maxSpeed' placeholder='Vitesse max' />
                        <Input type='number' name='powerFul' placeholder='Puissance' />
                        <Input type='number' name='seat' placeholder='Siège' />
                        <Input type='number' name='safe' placeholder='Coffre' />
                        <Select name='available'>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Le véhicule est-il disponible ?" />
                            </SelectTrigger>
                            <SelectContent>
                                    <SelectItem value="oui">
                                        Oui
                                    </SelectItem>
                                    <SelectItem value="non">
                                        Non
                                    </SelectItem>
                            </SelectContent>
                        </Select>
                <SubmitButton className='w-full'>Ajouter le véhicule</SubmitButton>
            </form>
        </Block>
    )
}
