"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { signinSchema } from "./formSchemas"
import yup from 'yup'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LabelSeparator } from "@/components/ui/separator"
import SocialAuth from "./SocialAuth"
import { Eye, EyeOff, Facebook } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Routes from "@/Routes"
import useAuthStore from "@/src/contexts/useAuthStore"


type SignupRenterFormData = yup.InferType<typeof signinSchema>;

export default function SignupForm () {

    const {facebookLogin, loginWithGoogle, loginWithEmail} = useAuthStore()
    const [viewPass, setViewPass] = useState(false)
    const form = useForm<SignupRenterFormData>({
      resolver: yupResolver(signinSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });
  
  
    const onSubmit = async (data: SignupRenterFormData) => {
      await loginWithEmail(data.email, data.password)
    };

    return (
        <div className=" w-full">
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder="my@email.com" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="w-full relative items-center flex">
                              <Input type= {viewPass ? 'text' : 'password'} placeholder="Password" {...field} />
                              <div className="absolute right-2 cursor-pointer" onClick={() => setViewPass(prev => !prev)}>{ viewPass ? <Eye className="w-4" /> : <EyeOff className="w-4" /> }</div>
                              </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full py-2 items-center flex justify-between gap-1 ">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember-me" className='w-6 h-6' />
                          <label
                            htmlFor="remember-me"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remeber me 
                          </label>
                        </div>
                        <Link href={Routes.resetPassword} className="text-primary text-sm font-medium hover:underline">Forgot Password?</Link>
                    </div>

                    <Button loading={form.formState.isSubmitting} className="text-xs h-11 mt-4 rounded-lg">
                        Continue
                    </Button>
                </form>
            </Form>

            <LabelSeparator label='or' className='text-xs my-5' />
            <div className="w-full flex flex-col md:flex-row gap-3">
              <SocialAuth 
                type="google" 
                label="google" 
                icon={
                      <img src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' alt='google-auth' className=" w-8 h-auto flex" />
                  }
                  handleSignin={loginWithGoogle}
                />

              <SocialAuth 
                type="facebook" 
                label="facebook" 
                icon={<Facebook className="text-primary" />}
                handleSignin={facebookLogin}
                />
            </div>
        </div>
    )
}