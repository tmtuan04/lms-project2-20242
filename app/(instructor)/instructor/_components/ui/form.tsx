"use client"
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

import { CourseTableData } from "@/app/lib/definitions";
import { useEffect } from "react"

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

export default function CreateCourseForm({ onSubmit, initialData }: MyFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: "",
            status: "Draft",
            id: "",
            price: 0,
        },
    })

    useEffect(() => {
        if (!form.getValues("status")) {
            form.setValue("status", "Draft");
        }
    }, [form]);

    function handleSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("Submitted values:", values);
            onSubmit(values as CourseTableData);
            form.reset()
        } catch (error) {
            console.error("Form submission error", error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 max-w-3xl mx-auto py-4">

                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="my-1">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. 'Advanced Web Development"

                                        type="text"
                                        {...field} />
                                </FormControl>
                                <FormDescription className="text-sm">This is your public  name course. Don`t worry you can always change this later. </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <input type="hidden" {...field} />
                        )}
                    />
                </div>
                <Button type="submit" className="px-4">{initialData ? "Update" : "Create"}</Button>
            </form>
        </Form>
    )
}