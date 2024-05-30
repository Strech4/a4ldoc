"use server"

import { userExist } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"


const prisma = new PrismaClient();

export const RegisterUser = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const surname = formData.get('surname') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('Confpassword') as string;
        
        if(!name || !surname || !email || !password || !confirmPassword) {
            return { error: "Veuillez remplir tous les champs requis." }
        }

        if(password !== confirmPassword) {
            return { error: "Les mots de passe ne sont pas identiques" }
        }

        const isUserExist = await userExist(email)

        if(isUserExist) {
            return { error: "Cette adresse email est déjà utilisée" }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newName = `${surname} ${name}`;

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: newName,
                roles: {
                    connect: { name: 'membre' },
                  },
            },
        });

        if (!user) {
            return {
                error: 'Échec de la création du compte utilisateur'
            }
        }
        return { success: "Votre compte a été créé avec succès" }

        
    } catch (error) {
        return { error: "erreur incconnu au battailon détecter (RegisterAction)" }
    }
}

