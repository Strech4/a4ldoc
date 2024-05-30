import React from 'react'
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
    return (
        <Table>
            <TableCaption>Mise à jour le {new Date().toLocaleDateString()}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-min md:w-[100px]">Dispo</TableHead>
                    <TableHead>Modèle</TableHead>
                    <TableHead>Marque</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead className="hidden sm:table-cell">Assurance T1</TableHead>
                    <TableHead className="hidden sm:table-cell text-right">Vitesse max</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cars.map((car, index) => (
                    <TableRow key={index}>
                        <TableCell className="">
                            <Badge variant="default">{car.available}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{car.name}</TableCell>
                        <TableCell>{car.model}</TableCell>
                        <TableCell className='text-nowrap'>{car.price}€</TableCell>
                        <TableCell className="hidden sm:table-cell">{car.t1}€</TableCell>
                        <TableCell className="hidden sm:table-cell text-right">{car.maxSpeed} Km/h</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
