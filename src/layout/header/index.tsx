'use client';

import useResponsive from "@/src/hooks/useResponsive";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const isDesktop = useResponsive() === 'desktop';

  useEffect(() => {
    // Set isMounted to true after the component mounts on the client
    setIsMounted(true);
  }, []);

  return (
    <header className="w-full min-h-12">
      {!isMounted ? null : isDesktop ? <DesktopHeader /> : <MobileHeader />}
    </header>
  );
}
