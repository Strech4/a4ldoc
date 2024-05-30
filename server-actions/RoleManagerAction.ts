"use server"
import { userExist } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import { checkUserRole } from "./Utils-Action";


const prisma = new PrismaClient();

export const RoleManagerAction = async (formData: FormData) => {
    try {
        const email = formData.get('email') as string;
        const role = formData.get('role') as string;

        if (!email || !role) {
            return { error: "Tous les champs doivent être remplis" }
        }

        const userId = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (!userId) {
            return { error: "Aucun utilisateur trouvé avec cet email" };
        }

        const hasRole = await checkUserRole(userId.id, role);

        if (hasRole) {
            return { error: `L'utilisateur ${email} a déjà le rôle ${role}` };
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId.id },
            data: {
                roles: {
                    connect: { name: role }
                }
            }
        });

        if (!updatedUser) {
            return { error: "Erreur lors de la mise à jour du rôle" };
        }

        return { success: `Le rôle ${role} a bien été ajouté à l'utilisateur ${email}` }

    } catch (error) {
        console.error(error);
        return { error: "Erreur inconnue au battailon détecter (addCarAction)" }
    }
}