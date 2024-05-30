"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function countUsers() {
    try {
        const count = await prisma.user.count();
        return count;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs:", error);
        return 0;
    }
}

export async function countCarModels() {
    try {
        const count = await prisma.carType.count();
        return count;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de modèles de véhicules:", error);
        return 0;
    }
}

export async function countVehicles() {
    try {
        const count = await prisma.car.count();
        return count;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de véhicules:", error);
        return 0;
    }
}

export async function checkUserRole(userId: string, roleName: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: true,
      },
    });
  
    if (!user) return false;
  
    return user.roles.some(role => role.name === roleName);
  }


  export async function getAllRoles() {
      try {
          const roles = await prisma.role.findMany();
          return roles;
      } catch (error) {
          console.error("Erreur lors de la récupération des grades:", error);
          return [];
      }
  }

