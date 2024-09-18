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
      <div id="content"
           className="app-img-container p-4 pt-[72px] md:pt-0 pb-[100px] md:px-10 md:max-w-screen-lg flex flex-col mx-auto items-center">
        <img src="/images/flor1.png" alt="Flor 1" className="bg-image bg-image-1"/>
        <img src="/images/flor2.png" alt="Flor 2" className="bg-image bg-image-2"/>
        <img src="/images/flor3.png" alt="Flor 3" className="bg-image bg-image-3"/>
        <img src="/images/flor4.png" alt="Flor 4" className="bg-image bg-image-4"/>
        {/*<img src="/images/flor5.png" alt="Flor 5" className="bg-image bg-image-5"/>*/}
        <div className="main-content">
          <Component {...pageProps} />
        </div>
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
