"use client"
import React, { useState, useEffect } from 'react';
import { getAllCars } from '@/server-actions/CarAction';
import { CarTable } from './CarTable';
import { Skeleton } from '../ui/skeleton';
import { Block } from '../basic/Block';
import { Input } from '../ui/input'; // Assurez-vous que le chemin d'importation est correct

interface Car {
    id: number;
    name: string;
    model: string;
    price: number;
    maxSpeed: number;
    available?: string;
    t1?: string;
}

const CarsDocument: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const result = await getAllCars();
                if (!('error' in result)) {
                    setCars(result);
                } else {
                    throw new Error(result.error);
                }
            } catch (err) {
                setError('Erreur lors de la récupération des voitures');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (loading) return <div className='space-y-4'>
        <Skeleton className="w-1/2 mx-auto h-12 rounded-xl" />
        <Skeleton className="w-full h-[80vh] rounded-xl" />
    </div>;
    if (error) return <Block className='col-span-12 md:col-span-12 grid place-content-center h-[50vh]'>
        <h1>Oups... une erreur s'est produite. Nous travaillons à sa résolution.</h1>
    </Block>;

    return (
        <>
            <Input
                type="text"
                placeholder="Rechercher par modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full md:w-1/2 mx-auto"
            />
            <CarTable cars={filteredCars} />
        </>
    );
};

export default CarsDocument;