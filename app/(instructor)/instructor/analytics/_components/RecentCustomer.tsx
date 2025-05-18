'use client';
import { RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { Customer } from '@/app/lib/definitions';
import { useEffect, useState, useCallback } from 'react';
import { useUserStore } from '@/app/stores/useUserStore';
import { getRecentCustomer } from '@/app/lib/data';

export default function RecentCustomers() {
    // const recentCustomers = (): Customer[] => {
    //     return [
    //         {
    //             id: 'inv001',
    //             name: 'Nguyen Van Anh',
    //             email: 'a@example.com',
    //             image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
    //             amount: 120000,
    //         },
    //         {
    //             id: 'inv002',
    //             name: 'Tran Thi Ngoc',
    //             email: 'b@example.com',
    //             image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
    //             amount: 250000,
    //         },
    //         {
    //             id: 'inv003',
    //             name: 'Le Van Cuong',
    //             email: 'c@example.com',
    //             image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
    //             amount: 100000,
    //         },
    //         {
    //             id: 'inv004',
    //             name: 'Nguyen Van Sang',
    //             email: 'a@example.com',
    //             image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
    //             amount: 200000,
    //         },
    //     ];
    // };
    const [customers, setCustomers] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const user = useUserStore((state) => state.user)

    const fetchCustomers = useCallback(async () => {
        if (user?.id) {
            setIsLoading(true);
            const data = await getRecentCustomer(user.id);
            setCustomers(data);
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-start gap-4 rounded-xl bg-gray-50 p-4">
                <div className='text-xl md:text-2xl leading-none font-semibold'>Recent Customers</div>
                <div className="bg-white px-6 ">
                    {customers.map((invoice: Customer, i) => {
                        return (
                            <div
                                key={invoice.id}
                                className={clsx(
                                    'flex flex-row items-center justify-between py-4',
                                    { 'border-t': i !== 0 }
                                )}
                            >
                                <div className="flex items-center">
                                    <Image
                                        src={invoice.image_url}
                                        alt={`${invoice.name}'s profile picture`}
                                        className="mr-4 rounded-full"
                                        width={32}
                                        height={32}
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base">
                                            {invoice.name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                            {invoice.email}
                                        </p>
                                    </div>
                                </div>
                                <p className="truncate text-sm font-medium md:text-base">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(Number(invoice.amount))}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={fetchCustomers}
                    className="flex items-center hover:text-blue-600 transition cursor-pointer "
                >
                    <RefreshCw className={clsx(
                        'h-5 w-5 text-gray-500',
                        { 'animate-spin': isLoading }
                    )} />
                    <h3 className="ml-2 text-sm text-gray-500">{isLoading ? 'Refreshing...' : 'Click to refresh'}</h3>
                </button>

            </div>
        </div>
    );
}
