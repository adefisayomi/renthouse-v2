import "@/styles/globals.css";
import { useEffect, type ReactElement, type ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {Poppins} from 'next/font/google'
import CustomToast from "@/components/CustomToast";
import useAuthStore from "@/src/contexts/useAuthStore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "900", "500", "700", "300", "200", "100", "600", '800']
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const {initialize} = useAuthStore()
  useEffect(() => {
    initialize()
  }, [])
 
  return (
    <div className={poppins.className}>
      <CustomToast />
      {getLayout(<Component {...pageProps} />)}
    </div>
  )
}