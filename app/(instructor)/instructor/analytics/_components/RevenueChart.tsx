"use client"

// Demo with shadCN UI

import { TrendingUp, TrendingDown } from "lucide-react"
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

// import { RevenueChartData } from "@/app/lib/definitions"
import { getRevenueData } from "@/app/lib/data"
import { useUserStore } from "@/app/stores/useUserStore"

const courses = ["React Basics", "NodeJS Master", "UI Design", "Python Intro", "DevOps Essentials"];

const chartData2 = [
    { month: "January", "React Basics": 0, "NodeJS Master": 0, "UI Design": 0, "Python Intro": 0, "DevOps Essentials": 0 },
    { month: "February", "React Basics": 0, "NodeJS Master": 0, "UI Design": 0, "Python Intro": 0, "DevOps Essentials": 0 },
    { month: "March", "React Basics": 0, "NodeJS Master": 100000, "UI Design": 400000, "Python Intro": 60000, "DevOps Essentials": 40000 },
    { month: "April", "React Basics": 100000, "NodeJS Master": 12000, "UI Design": 50000, "Python Intro": 30000, "DevOps Essentials": 20000 },
    { month: "May", "React Basics": 100000, "NodeJS Master": 130000, "UI Design": 15000, "Python Intro": 35000, "DevOps Essentials": 200000 },
    { month: "June", "React Basics": 200000, "NodeJS Master": 100000, "UI Design": 30000, "Python Intro": 50000, "DevOps Essentials": 0 },
];


const colors = ["#60a5fa", "#f59e42", "#a78bfa", "#34d399", "#f472b6"];



const chartConfig = {
    venenue: {
        label: "Revenue",
        color: "#60a5fa",
    },
} satisfies ChartConfig

export default function RevenueChart() {
    const [chartData, setChartData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const user = useUserStore((state) => state.user)
    const [selectedFilter, setSelectedFilter] = useState("total_revenue");

    useEffect(() => {
        if (!user) return

        const fetchData = async () => {
            setIsLoading(true)
            const data = selectedFilter === "total_revenue"
                ? await getRevenueData(user.id)
                : chartData2;
            setChartData(data);
            setIsLoading(false)
        }

        fetchData()
    }, [user, selectedFilter])

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
                    <div className="flex justify-between items-start w-full">
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
                                    {courses.map((course, idx) => (
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
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    {selectedFilter === "total_revenue" && (<div className="flex gap-2 font-medium leading-none">
                        {trendingText} {trendingIcon}
                    </div>)}
                    {/* <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                    </div> */}
                </CardFooter>
            </Card >
        </div >
    )
}