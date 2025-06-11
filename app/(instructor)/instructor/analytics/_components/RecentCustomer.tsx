'use client';
import { RefreshCw, BookOpen, Sparkles, UserX } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { Customer, CourseInfo } from '@/app/lib/definitions';
import { useEffect, useState, useCallback } from 'react';
import { useUserStore } from '@/app/stores/useUserStore';
import {
    getRecentCustomer,
    getTopEnrolledCustomers,
    getTopSpenders,
    getUserCoursesWithProgress,
    getTopCompletedStudents,
} from '@/app/lib/data';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
// import { Progress as ProgressShadCN } from "@/components/ui/progress";


export default function RecentCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("last_invoice");
    const user = useUserStore((state) => state.user);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [courses, setCourses] = useState<CourseInfo[]>([]);
    const [showModal, setShowModal] = useState(false);

    const fetchCustomers = useCallback(async () => {
        if (!user?.id) return;

        setIsLoading(true);

        let data: Customer[] = [];

        switch (selectedFilter) {
            case 'most_enrolled':
                data = await getTopEnrolledCustomers(user.id);
                break;
            case 'highest_spent':
                data = await getTopSpenders(user.id);
                break;
            case 'most_completed':
                data = await getTopCompletedStudents(user.id);
                break;
            case 'last_invoice':
            default:
                data = await getRecentCustomer(user.id);
                break;
        }

        setCustomers(data);
        setIsLoading(false);
    }, [selectedFilter, user?.id]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    // Hàm fetch khóa học đã tham gia và phần trăm hoàn thành
    const fetchCustomerCourses = async (customerId: string) => {
        if (!user?.id) return;
        const data = await getUserCoursesWithProgress(customerId, user.id);
        setCourses(data);
    };

    const handleCustomerClick = async (customer: Customer) => {
        setSelectedCustomer(customer);
        await fetchCustomerCourses(customer.id);
        setShowModal(true);
    };

    const renderAmount = (item: Customer) => {
        switch (selectedFilter) {
            case 'last_invoice':
            case 'highest_spent':
                return <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full shadow-md text-sm font-semibold">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>{new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(Number(item.amount))}</span>
                </div>
            case 'most_enrolled':
                return <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full text-sm font-medium shadow-md">
                    <BookOpen className="w-4 h-4" />
                    <span>{item.amount} enrolled</span>
                </div>

            case 'most_completed':
                return <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full text-sm font-medium shadow-md">
                    <BookOpen className="w-4 h-4" />
                    <span>{item.amount} course</span>
                </div>
            default:
                return item.amount;
        }
    };
    const completedCourses = courses.filter(course => course.completedPercent === 100).length;
    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-start gap-4 rounded-xl bg-gray-50 p-4">
                <div className='flex  justify-between items-center text-xl md:text-2xl leading-none font-semibold'>
                    <p>Recent Customers</p>
                    <Select onValueChange={setSelectedFilter} value={selectedFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a choose" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter</SelectLabel>
                                <SelectItem value="last_invoice">Last Invoice</SelectItem>
                                <SelectItem value="most_enrolled">Top Registrations</SelectItem>
                                <SelectItem value="most_completed">Top Completed</SelectItem>
                                <SelectItem value="highest_spent">Top Spenders</SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="bg-white px-6 ">
                    {customers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 py-10">
                            <UserX className="h-10 w-10 text-gray-400" />
                            <p className="text-sm font-medium text-gray-600">Chưa có dữ liệu.</p>
                            <p className="text-xs text-gray-400 text-center max-w-sm">
                                Hiện tại chưa có dữ liệu của các khóa học theo bộ lọc này. Hãy thử chọn bộ lọc khác hoặc quay lại sau.
                            </p>
                        </div>
                    ) : (
                        customers.map((invoice: Customer, i) => {
                            return (
                                <div
                                    key={`${invoice.id}-${i}`}
                                    className={clsx(
                                        'flex flex-col',
                                        { 'border-t': i !== 0 }
                                    )}
                                >
                                    <div className='flex py-1 text-gray-700 text-sm font-medium items-center'>{invoice.course_title}</div>
                                    <div className='flex flex-row items-center justify-between pb-4 cursor-pointer hover:bg-gray-100 rounded'
                                        onClick={() => handleCustomerClick(invoice)}>
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

                                        {renderAmount(invoice)}

                                    </div>
                                </div>
                            );
                        }))}
                </div>
                {showModal && selectedCustomer && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6 relative">
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 cursor-pointer"
                                onClick={() => setShowModal(false)}
                            >✕</button>
                            {/* Thông tin học viên */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src={selectedCustomer.image_url}
                                    alt={selectedCustomer.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full mr-3"
                                />
                                <div>
                                    <div className="font-bold text-lg">{selectedCustomer.name}</div>
                                    <div className="text-gray-500 text-sm">{selectedCustomer.email}</div>
                                    <div className="text-gray-400 text-xs">
                                        {selectedCustomer.joined_at
                                            ? (() => {
                                                const d = new Date(selectedCustomer.joined_at);
                                                const month = String(d.getMonth() + 1).padStart(2, "0");
                                                const day = String(d.getDate()).padStart(2, "0");
                                                return `Joined: ${d.getFullYear()}-${month}-${day}`;
                                            })()
                                            : ""}
                                    </div>
                                    <div className="mt-2 flex gap-2 text-xs">
                                        <span className="bg-blue-50 text-blue-600 rounded px-2 py-0.5">{courses.length} courses</span>
                                        <span className="bg-yellow-50 text-yellow-600 rounded px-2 py-0.5">Rating: 4.8 ⭐</span>
                                    </div>
                                </div>
                            </div>


                            <div className="flex gap-2">
                                {(() => {
                                    if (courses.length === 0) return null;
                                    // Khóa học mua mới nhất là phần tử đầu tiên
                                    const latestJoin = new Date(courses[0].coursejoin);
                                    const now = new Date();
                                    const diffDays = Math.floor((now.getTime() - latestJoin.getTime()) / (1000 * 60 * 60 * 24));
                                    if (diffDays <= 15) {
                                        return (
                                            <span className="inline-flex items-center bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-xs font-semibold">
                                                🏅 Active Learner
                                            </span>
                                        );
                                    }
                                    return null;
                                })()}

                                <span className="inline-flex items-center bg-orange-100 text-orange-600 rounded-full px-3 py-1 text-xs font-semibold">🎯 Completed {completedCourses} courses</span>

                                {(() => {
                                    if (courses.length === 0) return null;
                                    const firstJoin = new Date(courses[courses.length - 1].coursejoin);
                                    const now = new Date();
                                    const diffDays = Math.floor((now.getTime() - firstJoin.getTime()) / (1000 * 60 * 60 * 24));
                                    if (diffDays <= 15) {
                                        return (
                                            <span className="inline-flex items-center bg-green-50 text-green-600 rounded-full px-3 py-1 text-xs font-semibold">
                                                👀 Newbie
                                            </span>
                                        );
                                    }
                                    return null;
                                })()}
                            </div>

                            <div>
                                <div className="font-semibold text-sm mb-2">Courses joined:</div>
                                <ul className="space-y-2">
                                    {courses.map((course) => (
                                        <li key={course.id} className="flex items-center bg-gray-100 rounded-lg p-2 shadow-sm">
                                            <Image
                                                src={course.image_url}
                                                alt={course.title}
                                                width={60}
                                                height={60}
                                                className="mr-3"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{course.title}</div>
                                                <div className="text-xs text-gray-400">
                                                    {course.coursejoin
                                                        ? (() => {
                                                            const d = new Date(course.coursejoin);
                                                            const month = String(d.getMonth() + 1).padStart(2, "0");
                                                            const day = String(d.getDate()).padStart(2, "0");
                                                            return `Joined: ${d.getFullYear()}-${month}-${day}`;
                                                        })()
                                                        : ""}
                                                </div>
                                                {/* <ProgressShadCN value={course.completedPercent} indicatorClassName={`${course.completedPercent === 100 ? 'bg-[#0fba82]' : 'bg-[#0484cc]'}`} /> */}
                                            </div>

                                            <Badge variant="default"
                                                className={clsx(
                                                    course.completedPercent > 0 ? 'bg-blue-500' : 'bg-red-500',
                                                    'text-white text-sm ml-4'
                                                )} >
                                                {course.completedPercent}%
                                            </Badge>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                )
                }
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

            </div >
        </div >
    );
}
