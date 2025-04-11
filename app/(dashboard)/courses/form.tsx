"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { CourseTableData } from "./types/table";

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, { message: "Title must be at least 2 characters" }),
    status: z.string().optional(),
    price: z.coerce.number(),
});

interface MyFormProps {
    onSubmit: (data: CourseTableData) => void;
    initialData?: CourseTableData | null;
}

export default function MyForm({ onSubmit, initialData }: MyFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            status: "",
            price: 0,
            id: "",
        },
    })

    function handleSubmit(values: z.infer<typeof formSchema>) {
        try {
            onSubmit(values as CourseTableData)
            form.reset()
            toast.success("User data submitted successfully!")
        } catch (error) {
            console.error("Form submission error", error)
            toast.error("Failed to submit the form. Please try again.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Name Course"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public  name course.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"

                                            type="number"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display price.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified status to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Published">Published</SelectItem>
                                            <SelectItem value="Draft">Draft</SelectItem>

                                        </SelectContent>
                                    </Select>
                                    <FormDescription>You can chose your status.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                    </div>

                </div>
                <Button type="submit" className="px-4">{initialData ? "Update" : "Create"}</Button>
            </form>
        </Form>
    )
}