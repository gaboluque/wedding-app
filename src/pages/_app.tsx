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
      <div id="content" className="p-4 pt-[72px] md:pt-0 pb-[100px] md:px-10 md:max-w-screen-lg flex flex-col mx-auto items-center">
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
