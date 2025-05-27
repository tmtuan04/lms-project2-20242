

import { CircleDollarSign, UsersRound, Inbox, FileText } from 'lucide-react';


const iconMap = {
    sales: CircleDollarSign,
    customers: UsersRound,
    courses: FileText,
    invoices: Inbox,
};

export default async function CardAnalys() {
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        numberofCourses,
    } = {
        numberOfInvoices: 300,
        numberOfCustomers: 110,
        totalPaidInvoices: 120000000,
        numberofCourses: 30,
    };

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
            <Card title="Total Sales" value={totalPaidInvoices} type="sales" />
            <Card title="Total Courses" value={numberofCourses} type="courses" />
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
            <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
            />
        </div>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'courses' | 'sales';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm transition transform hover:-translate-y-[5px] hover:shadow-xl">
            <div className="flex px-4 py-2">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className='truncate rounded-xl bg-white px-4 py-6 text-2xl font-semibold'
            >
                {type === 'sales' ?
                    new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(Number(value))
                    : value}
            </p>
        </div>
    );
}