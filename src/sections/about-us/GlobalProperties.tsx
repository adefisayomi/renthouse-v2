import { _properties } from "@/_data/images";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export default function GlobalProperties () {

    return (
        <div className="bg-theme-main w-full">
        <div className="w-full grid md:grid-cols-2 gap-8 px-4 py-12 md:py-8 md:items-center max-w-8xl mx-auto md:min-h-screen">
        <img
            src="https://firebasestorage.googleapis.com/v0/b/rent-house-a2c71.appspot.com/o/Left.svg?alt=media&token=5271b897-aba6-4076-bbfe-2850f43a4403"
            alt="about-image"
            draggable={false}
            className="object-cover flex w-full"
            />

            <div className="w-full flex flex-col flex-start gap-4 ">
                <div className="w-full flex flex-col gap-2 border-b pb-2 md:pb-10">
                    <h3 className="text-xs font-medium uppercase text-primary text-start">global properties</h3>
                    <h1 className="text-2xl capitalize font-bold text-slate-900 text-start">Welcome to Our Properties <br /> with all the Convenience</h1>
                    <p className="text-xs text-start text-muted-foreground">Arcu ac tortor dignissim convallis aenean et tortor at.Ac turpis egestas sed tempus urna et. Quisque eu pellentesque erat, eget bibendum ipsum. Cras euismod massa sed lacus lacinia, quis porta libero consectetur. In pulvinar lobortis eros vitae dapibus.
                    </p>
                </div>

                <div className="grid grid-cols-3 w-full items-center gap-2 py-4">
                    <Statcard label='10k' details='satisfied customers' />
                    <Statcard label='8+' details='years of experience' />
                    <Statcard label='200k' details='established housing' />
                </div>

                <div className="flex items-start flex-col gap-8 w-full md:flex-row">
                    <Button className="text-xs w-full max-w-md md:max-w-[250px] h-11 ">Explore Properties</Button>

                    <Link
                        href="tel:+234-812-345-6789"
                        className="flex items-center gap-3"
                        >
                        <span className="w-8 h-8 flex items-center justify-center border rounded-full border-primary">
                            <Phone className="w-4 h-4"/>
                        </span>
                        <span className="flex flex-col items-start gap-1">
                            <h2 className="text-xs font-semibold capitalize">call us anytime</h2>
                            <h3 className="text-[11px] lowercase text-muted-foreground">+234-812-345-6789</h3>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    )
}

const Statcard = ({label, details}: {label: string, details: string}) => {
    return (
        <div className="flex flex-col items-center justify-center cursor-default w-full max-w-fit md:max-w-full p-3 md:aspect-auto md:py-6 aspect-square gap-1 rounded-xl bg-slate-200">
            <h1 className="text-2xl md:text-5xl font-bold uppercase">{label}</h1>
            <p className="text-[10px] md:text-xs capitalize text-muted-foreground text-center">{details}</p>
        </div>
    )
}