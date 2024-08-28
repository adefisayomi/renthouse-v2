import { _properties } from "@/_data/images";
import Page from "@/components/page";
import LayoutWithImageHeader from "@/src/layout/layoutWithImageHeader";
import ContactUsForm from "@/src/sections/contact-us/contactForm";
import { Mail, MapPin, Phone, Timer } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ReactNode } from "react";
const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

export default function Contact () {
  return (
    <Page title="Contact Us">
      <div className=" w-full grow bg-[#f5f6fc]">
        <div className="w-full  max-w-8xl mx-auto md:flex-row md:gap-16 flex flex-col gap-6 px-4 py-8 md:py-32">
          <ContactInfo />
          <ContactUsForm />
        </div>
        <LeafletMap />
      </div>
    </Page>
  );
}

Contact.getLayout = (page: ReactNode) => (
    <LayoutWithImageHeader
    title="Contact Us"
    bgImage={_properties[2].image}
    >
        {page}
    </LayoutWithImageHeader>
)

const ContactInfo = () => (
  <div className="flex flex-col items-start gap-4  w-full border rounded-2xl md:max-w-md px-3 md:p-10 py-8 bg-white">
    <div className="flex flex-col gap-1 items-center border-b pb-5 w-full">
        <h4 className="text-xs uppercase text-primary text-center">to know more about our properties</h4>
        <h1 className="text-xl capitalize font-semibold text-center text-slate-900">reach out to us</h1>
    </div>
    

    <div className="space-y-2 text-sm w-full">
      <ContactLink
        href="tel:+234-816-920-8730"
        ariaLabel="Our phone"
        title="phone"
        icon={<Phone className="w-4 h-4 text-primary" />}
        text="+234 234 567 823"
      />
      <ContactLink
        href="mailto:info@renthouse.com"
        ariaLabel="Our email"
        title="email"
        icon={<Mail className="w-4 h-4 text-primary" />}
        text="info@renthouse.com"
      />
      <ContactLink
        href="https://www.google.com/maps"
        ariaLabel="Our address"
        title="address"
        icon={<MapPin className="w-4 h-4 text-primary" />}
        text="House 2, Clarence Avenue TX. USA"
      />
      <ContactLink
        href="https://www.google.com/maps"
        ariaLabel="working hour"
        title="working hour"
        icon={<Timer className="w-4 h-4 text-primary" />}
        text="24 hours / all day"
      />
    </div>
  </div>
);

const ContactLink = ({
  href,
  ariaLabel,
  title,
  icon,
  text,
}: {
  href: string;
  ariaLabel: string;
  title: string;
  icon: ReactNode;
  text: string;
}) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    title={title}
    className="flex items-center gap-2 font-normal text-xs w-full py-3 border-b"
  >
    <span className="w-8 h-8 flex items-center justify-center border rounded-full border-primary">{icon}</span>
    <span className="flex flex-col items-start gap-1">
      <h2 className="text-xs font-semibold capitalize">{title}</h2>
      <h3 className="text-[11px] lowercase text-muted-foreground">{text}</h3>
    </span>
  </Link>
);