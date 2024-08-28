import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import PageTransition from "@/components/PageTransition";


type BaseLayoutProps = {
    disableFooter?: boolean;
    disableHeader?: boolean;
    children: ReactNode;
}

export default function BaseLayout ({children, disableFooter, disableHeader}: BaseLayoutProps) {
    return (
        <div className="w-full flex flex-col min-h-screen">
            {!disableHeader && <Header />}
            <div className="grow">
                <PageTransition>{children}</PageTransition>
            </div>
            {!disableFooter && <Footer />}
        </div>
    )
}