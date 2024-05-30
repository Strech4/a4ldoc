import { PrismaClient } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const prisma = new PrismaClient();

export async function userExist(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

export async function countUsers() {
    try {
        const count = await prisma.user.count();
        console.log(count);
        
        return count;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs:", error);
        return 0;
    }
}




