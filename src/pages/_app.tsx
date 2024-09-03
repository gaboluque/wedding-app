import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { Header } from "@/components/Header";
import '@/styles/globals.scss'
import { Page } from "@/pages/api/pages";
import { apiUrl } from "@/config";

type AppOwnProps = { pages: Page[] }

export default function MyApp({
                                Component,
                                pageProps,
                                pages,
                              }: AppProps & AppOwnProps) {
  return (
    <>
      <Header pages={pages} />
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  const pages = await fetch(`${apiUrl}/pages`).then((res) => res.json());

  return { ...ctx, pages }
}
