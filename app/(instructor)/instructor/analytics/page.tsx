
import RevenueChart from './_components/RevenueChart'
import CardAnalys from './_components/CardAnalys'
import RecentCustomers from './_components/RecentCustomer'
import { Suspense } from 'react'

function AnalyticsPage() {
    return (
        <>
            <main className='p-8'>
                <h1 className='mb-4 text-xl md:text-2xl font-bold'>
                    Analytics Dashboard
                </h1>
                <Suspense fallback={<div className="animate-pulse rounded-xl bg-gray-200" />}>
                    <CardAnalys />
                </Suspense>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    <Suspense fallback={<div className="animate-pulse rounded-xl bg-gray-200" />}>
                        <RevenueChart />
                    </Suspense>
                    <Suspense fallback={<div className="animate-pulse rounded-xl bg-gray-200" />}>
                        <RecentCustomers />
                    </Suspense>
                </div>
            </main>
        </>
    )
}

export default AnalyticsPage