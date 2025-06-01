"use client"

// Demo with shadCN UI

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState, useEffect } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { RevenueChartData } from "@/app/lib/definitions"
import { getRevenueData } from "@/app/lib/data"
import { useUserStore } from "@/app/stores/useUserStore"

// const chartData: RevenueChartData[] = [
//     { month: "January", venenue: 800000 },
//     { month: "February", venenue: 2000000 },
//     { month: "March", venenue: 1200000 },
//     { month: "April", venenue: 1900000 },
//     { month: "May", venenue: 0 },
//     { month: "June", venenue: 1400000 },
//     { month: "July", venenue: 1700000 },
//     { month: "August", venenue: 1850000 },
//     { month: "September", venenue: 0 },
//     { month: "October", venenue: 1500000 },
//     { month: "November", venenue: 1900000 },
//     { month: "December", venenue: 0 },
// ]



const chartConfig = {
    venenue: {
        label: "Revenue",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export default function RevenueChart() {
    const [chartData, setChartData] = useState<RevenueChartData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        if (!user) {
            return
        }
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getRevenueData(user.id);
            setChartData(data);
            setIsLoading(false)
        }
        fetchData()
    }, [user])

    let trendingText = "";
    let trendingIcon = null;
    if (chartData.length >= 2) {
        const current = chartData[chartData.length - 1].venenue;
        const prev = chartData[chartData.length - 2].venenue;
        if (prev === 0 && current === 0) {
            trendingText = "No revenue change";
        } else if (prev === 0) {
            trendingText = "Trending up (new revenue this month)";
            trendingIcon = <TrendingUp className="h-4 w-4 text-blue-500" />;
        } else {
            const percent = ((current - prev) / prev) * 100;
            if (percent > 0) {
                trendingText = `Trending up by ${percent.toFixed(1)}% this month`;
                trendingIcon = <TrendingUp className="h-4 w-4 text-green-500" />;
            } else if (percent < 0) {
                trendingText = `Trending down by ${Math.abs(percent).toFixed(1)}% this month`;
                trendingIcon = <TrendingDown className="h-4 w-4 text-red-500" />;
            } else {
                trendingText = "No revenue change this month";
            }
        }
    }

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>January - {new Date().toLocaleDateString("en-US", { month: "long" })} {new Date().getFullYear()}</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-60">
                            <span className="animate-spin rounded-full border-4 border-t-transparent h-12 w-12"></span>
                            <span className="ml-4 font-medium text-lg">Loading Data ...</span>
                        </div>
                    ) : (
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={true}
                                    content={<ChartTooltipContent indicator="dashed"

                                    />}

                                />
                                {/* <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} /> */}
                                <Bar dataKey="venenue" fill="var(--color-venenue)" radius={4} />
                            </BarChart>
                        </ChartContainer>)
                    }
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        {trendingText} {trendingIcon}
                    </div>
                    {/* <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                    </div> */}
                </CardFooter>
            </Card>
        </div>

    )
}