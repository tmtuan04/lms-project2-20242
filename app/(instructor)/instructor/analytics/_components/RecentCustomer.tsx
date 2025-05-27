import { RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

interface Customer {
    id: string;
    name: string;
    email: string;
    image_url: string;
    amount: number | string;
}

export default async function RecentCustomers() {
    const recentCustomers = (): Customer[] => {
        return [
            {
                id: 'inv001',
                name: 'Nguyen Van Anh',
                email: 'a@example.com',
                image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
                amount: 120000,
            },
            {
                id: 'inv002',
                name: 'Tran Thi Ngoc',
                email: 'b@example.com',
                image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
                amount: 250000,
            },
            {
                id: 'inv003',
                name: 'Le Van Cuong',
                email: 'c@example.com',
                image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
                amount: 100000,
            },
            {
                id: 'inv004',
                name: 'Nguyen Van Sang',
                email: 'a@example.com',
                image_url: 'https://img.freepik.com/premium-vector/smiling-girl-character_146237-61.jpg?w=826',
                amount: 200000,
            },
        ];
    };

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className='text-xl md:text-2xl leading-none font-semibold'>Recent Customers</div>
                <div className="bg-white px-6 ">
                    {recentCustomers().map((invoice: Customer, i) => {
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
                <div className="flex items-center pb-2 pt-6">
                    <RefreshCw className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                </div>
            </div>
        </div>
    );
}
