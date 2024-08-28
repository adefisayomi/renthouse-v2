import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from 'yup'
import { accountInformationSchema } from "./formSchemas";
import useAuthStore from "@/src/contexts/useAuthStore";
import { ProfilePicture } from "./ProfilePhoto";

export default function ProfessionalDetails() {

    const form = useForm<yup.InferType<typeof accountInformationSchema>>({
        resolver: yupResolver(accountInformationSchema),
        defaultValues: {firstName: '', lastName: '', email: '', phone: '', photoUrl: '', username: '', gender: '' }
      })
    const {user} = useAuthStore()
    const handleSetProfileImage = (value: string) => {
        return form.setValue('photoUrl', value);
    };

    // ---
    async function onSubmit(data: yup.InferType<typeof accountInformationSchema>) {
        
      }

    return (
        <Form {...form}>
        <div className="flex flex-col gap-4 w-full border bg-white p-4 rounded-sm">
        <h2 className="text-xs font-semibold capitalize">Account Information</h2>

            <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                    <ProfilePicture url={field.value!} setProfilePhoto={handleSetProfileImage} />
                )}
            />

            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-[11px]">First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className="text-[11px]">Username</FormLabel>
                        <FormControl>
                            <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-[11px]">Email</FormLabel>
                        <FormControl>
                            <Input type='email' placeholder="my@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-2">
                <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-[11px]">Phone</FormLabel>
                                <FormControl>
                                    <div className="h-11 flex items-center">
                                        <span className="rounded-l-md bg-muted text-xs font-bold border flex items-center justify-center w-16 border-r-0 h-full">
                                            +234
                                        </span>
                                        <Input type="tel" placeholder="(123) 456-7890" {...field} className="rounded-l-none "/>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[11px]">Gender</FormLabel>
                            <FormControl>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger className="text-[11px] w-full">
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectGroup>
                                            <SelectItem className="text-[11px] capitalize" value='male'>male</SelectItem>
                                            <SelectItem className="text-[11px] capitalize" value='female'>female</SelectItem>
                                            <SelectItem className="text-[11px] capitalize" value='others'>others</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div> 

            <Button loading={form.formState.isSubmitting} className="text-xs rounded-md self-end w-fit">
                Update
            </Button>
        </div>
        </Form>
    );
}
