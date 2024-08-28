"use client"

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface LogoProps {
    isDark?: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ isDark = false,  className }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logoSrc = useMemo(() => {
        return isDark ? '/logo_dark.svg' : '/logo_light.svg'
    }, [isDark]);

    if (!mounted) return <Loader2 className="animate-spin w-4 h-4" />;

    return (
        <div className="flex items-center ">
            <Link href='/' className="flex w-fit items-center gap-1">
                <Image
                    src={logoSrc}
                    alt='logo'
                    className={`w-[150px] h-auto ${className}`}
                    width={200}
                    height={400}
                    priority
                />
            </Link>
        </div>
    );
}

export default Logo;
