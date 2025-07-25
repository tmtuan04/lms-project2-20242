"use client"

// Demo with shadCN UI

import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LineChart, Line, XAxis } from "recharts"
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { RevenueChartData, CourseRevenueItem } from "@/app/lib/definitions"
import { getRevenueData, getCourseRevenueDataByMonth } from "@/app/lib/data"
import { useUserStore } from "@/app/stores/useUserStore"

const colors = ["#60a5fa", "#f59e42", "#a78bfa", "#34d399", "#f472b6", "#facc15", "#ef4444", "#10b981",];

const chartConfig = {
    venenue: {
        label: "Revenue",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export default function RevenueChart() {
    const [chartData, setChartData] = useState<RevenueChartData[] | CourseRevenueItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const user = useUserStore((state) => state.user)
    const [selectedFilter, setSelectedFilter] = useState("total_revenue");

    useEffect(() => {
        if (!user) return

        const fetchData = async () => {
            setIsLoading(true)
            const data = selectedFilter === "total_revenue"
                ? await getRevenueData(user.id)
                : await getCourseRevenueDataByMonth(user.id);
            setChartData(data);
            setIsLoading(false)
        }

        fetchData()
    }, [user, selectedFilter])


    const courseNames = chartData.length > 0
        ? Object.keys(chartData[0]).filter((key) => key !== "month")
        : [];

    let trendingText = "";
    let trendingIcon = null;
    if (selectedFilter === "total_revenue") {
        if (chartData.length >= 2) {
            const current = (chartData[chartData.length - 1] as RevenueChartData).venenue;
            const prev = (chartData[chartData.length - 2] as RevenueChartData).venenue;
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
    }

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <Card>
                <CardHeader>
                    <div className="flex grow justify-between items-start w-full">
                        {/* Title + Description bên trái */}
                        <div className="flex flex-col">
                            <CardTitle>Revenue</CardTitle>
                            <CardDescription>January - {new Date().toLocaleDateString("en-US", { month: "long" })} {new Date().getFullYear()}</CardDescription>
                        </div>
                        <Select onValueChange={setSelectedFilter} value={selectedFilter}>
                            <SelectTrigger className="w-[180px] font-semibold   ">
                                <SelectValue placeholder="Select a choose" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Filter</SelectLabel>
                                    <SelectItem value="total_revenue">Total Revenue</SelectItem>
                                    <SelectItem value="course_revenue">Course Revenue</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                {chartData.length === 0 && !isLoading ?
                    <CardContent>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <AlertCircle className="w-12 h-12 text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-700">No revenue yet</h2>
                            <p className="text-sm text-gray-500 max-w-xs">
                                You currently have no revenue from your courses this year. Share and promote your courses to get your first sales!
                            </p>
                        </div>
                    </CardContent> :
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-60">
                                <span className="animate-spin rounded-full border-4 border-t-transparent h-12 w-12"></span>
                                <span className="ml-4 font-medium text-lg">Loading Data ...</span>
                            </div>
                        ) : (
                            selectedFilter === "total_revenue" ? (
                                <ChartContainer config={chartConfig}>

                                    <BarChart data={chartData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(v) => v.slice(0, 3)} />
                                        <ChartTooltip cursor content={<ChartTooltipContent indicator="dashed" />} />
                                        <Bar dataKey="venenue" fill="var(--color-venenue)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            ) : (
                                <ChartContainer config={{}}>
                                    <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        {courseNames.map((course, idx) => (
                                            <Line
                                                key={course}
                                                dataKey={course}
                                                type="monotone"
                                                stroke={colors[idx % colors.length]}
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        ))}
                                    </LineChart>
                                </ChartContainer>
                            )

                        )}
                    </CardContent>
                }
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    {selectedFilter === "total_revenue" && (<div className="flex gap-2 font-medium leading-none">
                        {trendingText} {trendingIcon}
                    </div>)}
                </CardFooter>
            </Card >
        </div >
    )
}