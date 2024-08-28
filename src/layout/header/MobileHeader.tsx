import Logo from "@/components/Logo";
import SearchBar from "./searchBar";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { navConfig } from "./navConfig"
import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"
import useAuthStore from "@/src/contexts/useAuthStore";
import Routes from "@/Routes";



export default function MobileHeader () {
    return (
        <div className="w-full flex items-center justify-between px-3 h-full py-4">
           <Logo />

           <div className="flex items-center gap-2">
            <SearchBar />
            <DropdownMenuContainer />
           </div>
        </div>
    )
}

const DropdownMenuContainer = () => {
  const {user} = useAuthStore()
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon'>
              <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[90vw] md:w-[350px] h-[75vh]  mr-2 flex flex-col rounded-b-none bg-theme-dark border-none text-white">
          <DropdownMenuLabel className="py-4 px-3 text-sm capitalize font-semibold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
  
          <DropdownMenuGroup className="py-4 overflow-y-auto max-h-[90%] overflow-x-hidden grow">
              {
                  navConfig.map((nav, index) => (
                      <div key={index}>
                          <Link href={nav.href} key={index}>
                              <DropdownMenuItem className="text-xs capitalize border-b border-slate-400 rounded-none h-11 font-medium p-2">
                                  {nav.title}
                              </DropdownMenuItem>
                          </Link>
                      </div>
                  ))
              }
              <Link href='/settings'>
                              <DropdownMenuItem className="text-xs capitalize border-b border-slate-400 rounded-none h-11 font-medium p-2">
                                  profile settings
                              </DropdownMenuItem>
                          </Link>
          </DropdownMenuGroup>
  
          {
            user ?  <LogoutButton /> : (
              <Link href={Routes.login}>
                <Button className="w-full h-11 rounded-none">Sign In / Create Account</Button>
              </Link>
            )
          }
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  