"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const addModelAction = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;

        if (!name) {
            return {
                error: 'Le nom du modèle est obligatoire'
            }
        }

        const model = await prisma.carType.create({
            data: {
                name: name
            }
        });

        if (!model) {
            return {
                error: 'La création du modèle a échoué dans la base de données'
            }
        }

        return { success: "Le modèle a été ajouté avec succès" }

    } catch (error) {
        return { error: "erreur incconnu au battailon détecter (addModelAction)" }
    }
}

export const getCartTypeAction = async () => {
    try {
        const cartType = await prisma.carType.findMany();
        return cartType as { id: string; name: string; }[];
    } catch (error) {
        return [];
    }
}

export const addCarAction = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const model = formData.get('carType') as string;
        const price = Number(formData.get('price'));
        const maxSpeed = Number(formData.get('maxSpeed'));
        const powerFul = Number(formData.get('powerFul'));
        const seat = Number(formData.get('seat'));
        const safe = Number(formData.get('safe'));
        const available = formData.get('available') as string;

        if (!name || !model || !price || !maxSpeed || !powerFul || !seat || !safe || !available) {
            return { error: 'Veuillez remplir le formulaire complètement' }
        }

        
        const t1String = (price * 0.03).toFixed(2);
        const t2String = (price * 0.09).toFixed(2);
        const t3String = (price * 0.21).toFixed(2);
        const t4String = (price * 0.30).toFixed(2);
        const ctString = (price * 0.07).toFixed(2);

        const car = await prisma.car.create({
            data: {
                name: name,
                model: model,
                price: price,
                maxSpeed: maxSpeed,
                powerFul: powerFul,
                seat: seat,
                safe: safe,
                available: available,
                t1: t1String,
                t2: t2String,
                t3: t3String,
                t4: t4String,
                ct: ctString
            }
        });

        if (!car) {
            return {
                error: 'La création du véhicule a échoué dans la base de données'
            }
        }

        return { success: "Le véhicule a été créé avec succès" }
    } catch (error) {
        console.error(error);
        return { error: "Erreur inconnue au battailon détecter (addCarAction)" }
    }
}


export const getAllCars = async () => {
    try {
        const cars = await prisma.car.findMany({
            orderBy: {
                model: 'asc'
            }
        });

        return cars as {
             id: number; 
             name: string; 
             model: string; 
             price: number; 
             maxSpeed: number; 
             powerFul: number; 
             seat: number; 
             safe: number; 
             available: string; 
        }[];
    } catch (error) {
        return { error: "erreur incconnu au battailon détecter (getAllCars)" }
    }
}
