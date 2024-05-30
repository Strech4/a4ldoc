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
                    <TableHead>Marque</TableHead>
                    <TableHead>Modèle</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead className="hidden sm:table-cell">Assurance T1</TableHead>
                    <TableHead className="hidden sm:table-cell text-right">Vitesse max</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cars.map((car, index) => (
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
                        <TableCell className="hidden sm:table-cell text-right">{car.maxSpeed} Km/h</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
