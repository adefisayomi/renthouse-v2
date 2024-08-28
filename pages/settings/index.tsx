import { useEffect, useState } from "react";
import Page from "@/components/page";
import useAuthStore from "@/src/contexts/useAuthStore";
import Layout from "@/src/layout";
import ChangePassword from "@/src/sections/dashboard/changePassword";
import { _dashboardNav } from "@/src/sections/dashboard/dash_config";
import Notifications from "@/src/sections/dashboard/notifications";
import ProfessionalDetails from "@/src/sections/dashboard/professionalDetails";
import Socials from "@/src/sections/dashboard/Socials";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Settings () {
    const { user } = useAuthStore();
    const [activeDiv, setActiveDiv] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const sectionContainer = document.getElementById("dashboard_section_container");
            const sections = sectionContainer?.children as HTMLCollectionOf<HTMLElement>;

            let currentSection = "";
            Array.from(sections).forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 150 && sectionTop >= -150) {
                    currentSection = section.id;
                }
            });

            setActiveDiv(currentSection);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveDiv(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0.1 }
        );

        const sectionContainer = document.getElementById("dashboard_section_container");
        const sections = sectionContainer?.children as HTMLCollectionOf<HTMLElement>;

        Array.from(sections).forEach((section) => {
            observer.observe(section);
        });

        window.addEventListener("scroll", handleScroll);

        return () => {
            Array.from(sections).forEach((section) => {
                observer.unobserve(section);
            });
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <Page title="Propfile Settings">
            <div className="w-full min-h-screen bg-theme-main py-10">
                <div className="w-full max-w-4xl mx-auto space-y-10">
                    <div className="w-full max-w-xs flex items-center gap-2 p-2">
                        <Image
                            src={user?.photoURL!}
                            alt={user?.displayName!}
                            priority
                            width={100}
                            height={100}
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex flex-col items-start gap-1 cursor-default">
                            <h4 className="text-xs font-semibold capitalize">{`${user?.displayName}/${user?.claims?.accountType}`}</h4>
                            <p className="text-[10px] text-muted-foreground">Update your username and manage your account</p>
                        </div>
                    </div>

                    <div className="w-full flex items-start justify-between gap-8">
                        <Navigation activeDiv={activeDiv} />

                        <div className="w-full flex flex-col gap-6 max-w-xl" id="dashboard_section_container">
                            <div id={_dashboardNav.account} className="section-container">
                                <ProfessionalDetails />
                            </div>
                            <div id={_dashboardNav.password} className="section-container">
                                <ChangePassword />
                            </div>
                            <div id={_dashboardNav.socials} className="section-container">
                                <Socials />
                            </div>
                            <div id={_dashboardNav.alerts} className="section-container">
                                <Notifications />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}

Settings.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

interface NavigationProps {
    activeDiv: string;
}

const Navigation = ({ activeDiv }: NavigationProps) => {
    return (
        <div className="w-full sticky top-[70px] left-0 border-x border-t rounded-[1px] max-w-[250px] bg-white md:block hidden">
            {Object.entries(_dashboardNav).map(([key, value], index) => (
                <Link href={`#${value}`} key={index} className={`w-full border-b p-4 h-[45px] flex items-center duration-150 ${activeDiv === value ? 'bg-slate-100 border-l-4 border-l-primary' : ''}`}>
                    <p className={cn("text-[11px] font-medium capitalize text-muted-foreground", {'uppercase': activeDiv === value})}>{value}</p>
                </Link>
            ))}
        </div>
    );
};
