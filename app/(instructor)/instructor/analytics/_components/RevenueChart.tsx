"use client"

// Demo with shadCN UI

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

const chartData = [
    { month: "January", desktop: 186, mobile: 800000 },
    { month: "February", desktop: 305, mobile: 2000000 },
    { month: "March", desktop: 237, mobile: 1200000 },
    { month: "April", desktop: 73, mobile: 1900000 },
    { month: "May", desktop: 209, mobile: 1300000 },
    { month: "June", desktop: 214, mobile: 1400000 },
    { month: "July", desktop: 260, mobile: 1700000 },
    { month: "August", desktop: 300, mobile: 1850000 },
    { month: "September", desktop: 220, mobile: 1600000 },
    { month: "October", desktop: 180, mobile: 1500000 },
    { month: "November", desktop: 240, mobile: 1900000 },
    { month: "December", desktop: 310, mobile: 2100000 },
]


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#93c5fd",
    },
    mobile: {
        label: "Revenue",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export default function RevenueChart() {
    return (
        <div className="flex w-full flex-col md:col-span-4">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>January - December 2024</CardDescription>
                </CardHeader>
                <CardContent>
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
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    {/* <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                    </div> */}
                </CardFooter>
            </Card>
        </div>

    )
}