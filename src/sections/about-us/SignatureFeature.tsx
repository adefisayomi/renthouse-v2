
import { Icon } from "@iconify/react/dist/iconify.js"



export default function SignatureFeature () {

    return (
        <div className="w-full mx-auto max-w-8xl flex flex-col gap-5 md:gap-8 px-4 py-8 md:min-h-screen md:items-center md:justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-2 ">
                <h3 className="text-xs font-medium uppercase text-primary text-center">signature features</h3>
                <h1 className="text-2xl capitalize font-bold text-slate-900  text-center">Masterful Design: A Showcase <br /> of Quality and Craftsmanship</h1>
            </div>

            <div className="flex flex-col gap-5 w-full md:grid md:grid-cols-2">
                {_signatureData.map((props, index) => <Signatures key={index} props={props} />)}
            </div>
        </div>
    )
}


const Signatures = ({props}: {props: {title: string, details: string, icon: any}}) => {
    const {details, icon, title} = props
    return (
        <div className="w-full rounded-md md:rounded-2xl p-3 md:p-8 bg-theme-main flex items-center group hover:bg-primary gap-2">
            <span className="w-fit p-3 border border-blue-300 rounded-md md:rounded-2xl bg-theme-main">
                {icon}
            </span>

            <span className="flex flex-col items-start justify-between gap-2">
                <h1 className="text-xs capitalize font-semibold group-hover:text-white text-slate-900">{title}</h1>
                <h1 className="text-[11px] capitalize text-muted-foreground group-hover:text-white">{details}</h1>
            </span>
        </div>
    )
}

const _signatureData= [
    {title: 'easy to rent', icon: <Icon icon="ic:baseline-house" className="w-8 h-8 md:w-12 md:h-12 text-primary" />, details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis neque'},
    {title: 'carefully crafted', icon: <Icon icon="hugeicons:web-design-01" className="w-8 h-8 md:w-12 md:h-12 text-primary"  />, details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis neque'},
    {title: 'in-built wardrobe', icon: <Icon icon="hugeicons:wardrobe-01" className="w-8 h-8 md:w-12 md:h-12 text-primary" />, details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis neque'},
    {title: 'lavish greenary', icon: <Icon icon="hugeicons:flower-pot" className="w-8 h-8 md:w-12 md:h-12 text-primary" />, details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis neque'},
    {title: 'spacious outdoors', icon: <Icon icon="ic:round-camera-outdoor" className="w-8 h-8 md:w-12 md:h-12 text-primary" />, details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis neque'},
    {title: 'planned construction', icon: <Icon icon="mdi:construction-outline" className="w-8 h-8 md:w-12 md:h-12 text-primary" />, details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis neque'},
]