import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { socialsFormSchema } from "./formSchemas"
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



export default function Socials () {

    const form = useForm<yup.InferType<typeof socialsFormSchema>>({
        resolver: yupResolver(socialsFormSchema),
        defaultValues: {facebook: '', twitter: '', instagram: '', linkedin: ''}
      })
    const [viewPass, setViewPass] = useState(false)

    // ---
    async function onSubmit(data: yup.InferType<typeof socialsFormSchema>) {
        
      }

    return (
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full border bg-white p-4 rounded-sm">
                <h2 className="text-xs font-semibold capitalize">Social Profiles</h2>
                <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Facebook</FormLabel>
                        <FormControl>
                            <Input type= 'url' placeholder="https://facebook.com/myusername" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Linkedin</FormLabel>
                        <FormControl>
                            <Input type= 'url' placeholder="https://linkedin.com/myusername" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Instagram</FormLabel>
                        <FormControl>
                            <Input type= 'url' placeholder="https://instagram.com/myusername" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Twitter</FormLabel>
                        <FormControl>
                            <Input type= 'url' placeholder="https://twitter.com/myusername" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Button loading={form.formState.isSubmitting} className="text-xs rounded-md self-end w-fit">
                    Update social profiles
                </Button>
            </form>
        </Form>
    )
}