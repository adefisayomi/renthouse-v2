"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

type SocialProps = {
    type: 'google' | 'facebook';
    label: string,
    icon: ReactElement;
    handleSignin: any
}
export default function SocialAuth ({icon, label, handleSignin}: SocialProps) {
    return (
        <Button 
            variant='outline'
            className={cn("h-11 capitalize w-full flex items-center gap-2 border-2")}
            onClick={handleSignin}
        >
            {icon} {label}
        </Button>
    );
}
