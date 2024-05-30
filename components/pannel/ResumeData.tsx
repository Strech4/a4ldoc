"use client"
import React, { useEffect, useState } from 'react'
import { Block } from '../basic/Block'
import { countCarModels, countUsers, countVehicles } from '@/server-actions/Utils-Action';
import { Skeleton } from "@/components/ui/skeleton"


export const ResumeData = () => {

  const [userCount, setUserCount] = useState(0);
  const [carType, setCarTYpe] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarTypes = async () => {
            try {
                const fetchedCarTypes = await countUsers();
                setUserCount(fetchedCarTypes);
                const fetchedCarModels = await countCarModels();
                setCarTYpe(fetchedCarModels);
                const fetchedCar = await countVehicles();
                setCarCount(fetchedCar);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération du nombre d'utilisateurs.");
            }
        };

        fetchCarTypes();
    }, []);

  return (
    <Block className='col-span-12 border-b border-t grid grid-cols-12 px-0 py-4 gap-4'>
        <Block className='col-span-12 md:col-span-4 flex justify-between p-0 border-l border-r px-4'>
            <h1>Utilisateur</h1>
            {loading ? <Skeleton className="w-[60px] h-[20px] rounded-full" />
                     : <p>{userCount}</p>}
        </Block>
        <Block className='col-span-12 md:col-span-4 flex justify-between p-0 border-l border-r px-4'>
            <h1>Véhicule</h1>
            {loading ? <Skeleton className="w-[60px] h-[20px] rounded-full" />
                     : <p>{carCount}</p>}
        </Block>
        <Block className='col-span-12 md:col-span-4 flex justify-between p-0 border-l border-r px-4'>
            <h1>Modèle de véhicule</h1>
            {loading ? <Skeleton className="w-[60px] h-[20px] rounded-full" />
                     : <p>{carType}</p>}
        </Block>
    </Block>
  )
}
