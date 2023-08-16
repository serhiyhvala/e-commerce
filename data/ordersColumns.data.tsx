import {ColumnDef} from "@tanstack/table-core";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, Calendar} from "lucide-react";

export interface IOrderColumns {
    fullName: string,
    email: string,
    userId: string,
    address: string,
    totalPrice: number,
    cretedAt: string
}

export const ordersColumns: ColumnDef<IOrderColumns>[] = [
    {
        accessorKey: "userId",
        header: "User ID"
    },
    {
        accessorKey: "fullName",
        header: "Full Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "totalPrice",
        header: ({column}) => (
            <Button variant='outline' className='flex items-center gap-2'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Total Price
                <ArrowUpDown className="h-4 w-4"/>
            </Button>
        )
    },
    {
        accessorKey: "cretedAt",
        header: ({column}) => (
            <Button variant='outline' className='flex items-center gap-2'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Created At
                <Calendar className="h-4 w-4"/>
            </Button>
        )
    },
]