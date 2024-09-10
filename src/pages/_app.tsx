import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { Header } from "@/components/Header";
import '@/styles/globals.scss'
import { apiUrl } from "@/config";
import { IPage } from "@/models/Page";

type AppOwnProps = { pages: IPage[] }

export default function MyApp({
                                Component,
                                pageProps,
                                pages,
                              }: AppProps & AppOwnProps) {
  return (
    <>
      <Header pages={pages}/>
      <div className="px-4 md:px-10 md:max-w-screen-lg flex flex-col mx-auto">
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
