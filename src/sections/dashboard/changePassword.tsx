import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { changePasswordFormSchema } from "./formSchemas"
import yup from 'yup'
import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"



export default function ChangePassword () {

    const form = useForm<yup.InferType<typeof changePasswordFormSchema>>({
        resolver: yupResolver(changePasswordFormSchema),
        defaultValues: {oldPassword: '', password: '', confirmPassword: ''}
      })

    // ---
    async function onSubmit(data: yup.InferType<typeof changePasswordFormSchema>) {
        
      }

    return (
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full border bg-white p-4 rounded-sm">
                <h2 className="text-xs font-semibold capitalize">Password</h2>
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Old Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Old Password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">New Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="New Password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Confirm Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Confirm Password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button loading={form.formState.isSubmitting} className="text-xs rounded-md self-end w-fit">
                    Change
                </Button>
            </form>
        </Form>
    )
}