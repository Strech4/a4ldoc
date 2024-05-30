import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Block } from '@/components/basic/Block';

export const AllUser = () => {

    const users = [
        { name: "John Doe", email: "john@doe.com", },
        { name: "Jane Smith", email: "jane@smith.com", },
    ]

    return (
        <Block className='col-span-12 md:col-span-8'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell className='text-nowrap'>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Block>
    )
}


