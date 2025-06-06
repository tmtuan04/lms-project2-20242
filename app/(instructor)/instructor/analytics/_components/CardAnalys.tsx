'use client'
import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/stores/useUserStore';
import { CircleDollarSign, UsersRound, Inbox, FileText } from 'lucide-react';
import { fetchCardAnalys } from '@/app/lib/data';
import { RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

const iconMap = {
    sales: CircleDollarSign,
    customers: UsersRound,
    courses: FileText,
    invoices: Inbox,
};

export default function CardAnalys() {
    const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
    const [numberofCourses, setNumberofCourses] = useState(0);
    const [numberOfCustomers, setNumberofCustomers] = useState(0);
    const [numberOfInvoices, setNumberOfInvoices] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                setIsLoading(true);
                const { courseCount, customerCount, invoiceCount, totalPaidInvoices } = await fetchCardAnalys(user.id);
                setNumberofCourses(courseCount);
                setNumberofCustomers(customerCount);
                setNumberOfInvoices(invoiceCount);
                setTotalPaidInvoices(totalPaidInvoices);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [user?.id]);


    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
            <Card title="Total Sales" value={isLoading
                ? <RefreshCcw className="animate-spin" />
                : totalPaidInvoices} type="sales" />
            <Card title="Total Courses" value={isLoading
                ? <RefreshCcw className="animate-spin" />
                : numberofCourses} type="courses" />
            <Card title="Total Course Enrollments" value={isLoading
                ? <RefreshCcw className="animate-spin" />
                : numberOfInvoices} type="invoices" />
            <Card
                title="Total Learners"
                value={isLoading
                    ? <RefreshCcw className="animate-spin" />
                    : numberOfCustomers}
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
    value: number | string | React.ReactNode;
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
                className={clsx(
                    type === 'sales' ? 'bg-gradient-to-r from-blue-100 border-2 border-blue-300' :
                        type === 'customers' ? 'bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300' :
                            type === 'courses' ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300' :
                                type === 'invoices' ? 'bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-300' : 'bg-white',
                    'truncate rounded-xl bg-white px-4 py-6 text-2xl font-semibold',
                )}
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