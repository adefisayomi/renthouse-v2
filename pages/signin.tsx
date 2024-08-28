import Page from "@/components/page";
import AuthLayout from "@/src/sections/auth/AuthLayout";
import AuthSignup from "@/src/sections/auth/AuthSignup";
import Link from "next/link";
import { ReactNode } from "react";



export default function Signin () {
    return (
        <Page title="Sign in or create an account">
        <div className="w-full max-w-md mx-auto p-4 md:p-10 py-10 border dark:border-muted rounded-xl flex flex-col justify-between bg-white dark:bg-background items-center gap-8">
            <div className="w-full flex flex-col items-center gap-2">
                <h2 className="tracking-normal text-2xl text-center capitalize text-primary font-bold">
                sign in / create an account
                </h2>
                <p className="text-sm text-center">Handle all your business with one account.</p>
            </div>

            <AuthSignup />
            
            <div className="flex items-center flex-col gap-8">
            <p className="text-[10px] text-center max-w-xs mt-5 text-muted-foreground">By continuing, you have read and agree to our <br /> <Link href='#' className="text-primary font-semibold">Terms and Conditions.</Link> </p>
            </div>
        </div>
        </Page>
    )
}
Signin.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>