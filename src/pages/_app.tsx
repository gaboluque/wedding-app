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
      <Header pages={pages}/>
      <div className="p-4 md:p-10 md:max-w-screen-lg flex flex-col mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  try {
    const pages = await fetch(`${apiUrl}/pages`).then((res) => res.json());

    return { ...ctx, pages }
  } catch (e) {
    console.error(e)
    return { ...ctx, pages: [] }
  }
}
