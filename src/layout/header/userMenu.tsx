import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LoaderCircle, LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import Routes from "@/Routes";
import useAuthStore from "@/src/contexts/useAuthStore";
import { User } from "firebase/auth";
import React, { memo } from 'react';
import { navConfig } from "./navConfig";
import LogoutButton from "@/components/LogoutButton";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
//


// NoUser component for unauthenticated state
const NoUser = memo(() => (
  <div className="flex items-center gap-3">
    <Link href={Routes.login}>
      <Button>Sign In / Up</Button>
    </Link>
  </div>
));
NoUser.displayName = 'NoUser'


export function UserMenu () {

  const { user, logout, loading } = useAuthStore();

  if (loading) return <LoaderCircle className="w-4 h-4 animate-spin" />

  if (!user) return <NoUser />

  return (
    <Menubar className="w-fit rounded-full p-0 border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="m-0 cursor-pointer outline-none p-0 px-0 py-0 rounded-full shadow-none border-none w-fit">
          <Avatar className="border-2 w-9 h-9 flex items-center justify-center">
            <AvatarImage className="w-full h-full object-cover" src={user?.photoURL || ''} />
            <AvatarFallback className="uppercase text-sm">
              {user?.displayName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <Link href='/settings'>
          <MenubarItem className="text-xs capitalize font-medium cursor-pointer h-9">
            Settings 
            <MenubarShortcut>
              <Settings2 className="w-4" />
            </MenubarShortcut>
          </MenubarItem>
          </Link>
          {/* <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub> */}
          <MenubarSeparator />
          <MenubarItem onClick={logout} className="text-xs h-9 capitalize cursor-pointer font-medium">
            Logout
            <MenubarShortcut>
              <LogOut className="w-4" />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
