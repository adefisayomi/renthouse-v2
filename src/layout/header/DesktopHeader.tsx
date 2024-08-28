import Logo from "@/components/Logo";
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navConfig } from "./navConfig";
import { usePathname } from 'next/navigation'
import { UserMenu } from "./userMenu";




export default function DesktopHeader () {

  
    return (
        <div className=" w-full max-w-8xl mx-auto grid items-center grid-cols-3 gap-2 px-2 py-4">
            <Logo />
            <div className="flex items-center justify-center"><NavMenu /></div>
            <div className="flex items-center justify-end"><UserMenu /></div>
        </div>
    )
}


const NavigationMenuLinkComponent = ({ href, title, isActive }: { href: string; title: string; isActive: boolean }) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={`text-xs font-medium capitalize flex flex-col ${isActive ? 'text-muted-foreground' : ''}`}>
        {title}
        {isActive && <span className="w-full bg-primary h-[2px]" />}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
)

const NavMenu = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-6 items-center">
        {navConfig.map((nav) => (
          <NavigationMenuLinkComponent
            key={nav.href}
            href={nav.href}
            title={nav.title}
            isActive={pathname === nav.href}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

  