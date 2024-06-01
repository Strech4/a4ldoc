import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '../ui/badge'
import { Block } from '../basic/Block'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';

interface Car {
    id: number;
    name: string;
    model: string;
    price: number;
    maxSpeed: number;
    powerFul?: number;
    seat?: number;
    safe?: number;
    available?: string;
    t1?: string;
}

interface CarTableProps {
    cars: Car[];
}

export const CarTable = ({ cars }: CarTableProps) => {
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();

    const resetFilters = () => {
        setMinPrice(undefined);
        setMaxPrice(undefined);
    };

    const filteredCars = cars.filter(car => {
        return (!minPrice || car.price >= minPrice) && 
               (!maxPrice || car.price <= maxPrice)
    });

    return (
        <div>
            <Block className='grid grid-cols-12 md:grid-cols-12 p-0 pt-4 mb-4 gap-3'>
                <div className='col-span-12 md:col-span-6 flex gap-3'>
                    <Input type='number' placeholder='Prix min...' value={minPrice ?? ''} onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}/>
                    <Input type='number' placeholder='Prix max...' value={maxPrice ?? ''} onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}/>
                </div>
                <div className='col-span-12 md:col-span-6 flex gap-3 justify-end'>
                    <Button onClick={resetFilters}>
                        <RotateCcw className='size-5' />
                    </Button>
                </div>
            </Block>
            <Table>
                <TableCaption>Mise à jour le {new Date().toLocaleDateString()}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-min md:w-[100px]">Dispo</TableHead>
                        <TableHead>Marque</TableHead>
                        <TableHead>Modèle</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead className="hidden sm:table-cell">Assurance T1</TableHead>
                        <TableHead className="hidden sm:table-cell">Puissance</TableHead>
                        <TableHead className="hidden sm:table-cell text-right">Vitesse max</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCars.map((car, index) => (
                        <TableRow key={index}>
                            <TableCell className="">
                                {car.available === "oui" ? (
                                    <Badge variant="success">{car.available}</Badge>
                                ) : (
                                    <Badge variant="destructive">{car.available}</Badge>
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{car.model}</TableCell>
                            <TableCell>{car.name}</TableCell>
                            <TableCell className='text-nowrap'>{car.price.toLocaleString('fr-FR')}€</TableCell>
                            <TableCell className="hidden sm:table-cell">{car.t1 ? `${Math.floor(Number(car.t1)).toLocaleString('fr-FR')}€` : 'N/A'}</TableCell>
                            <TableCell className="hidden sm:table-cell">{car.powerFul}</TableCell>
                            <TableCell className="hidden sm:table-cell text-right">{car.maxSpeed} Km/h</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
