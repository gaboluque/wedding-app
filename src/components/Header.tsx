import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IPage } from "@/models/Page";
import { formatDate } from "@/utils/dateUtils";

const HOME_PAGE: IPage = {
  id: 'home',
  title: 'Inicio',
  slug: '',
  content: [],
  createdAt: new Date(),
  updatedAt: new Date()
};

export const WEDDING_DATE = new Date("2024-12-07T17:00:00-05:00");
export const WEDDING_PLACE = "Hacienda Fagua, Cajicá";

type MenuItemProps = {
  title: string,
  link: string,
  active: boolean,
  onClick: () => void
}

const MenuItem = ({ title, link, active, onClick }: MenuItemProps) => (
  <Link href={link} className={`menu-item cursor-pointer block lg:inline-block ${active ? "active" : "text-black"}`} scroll={false} onClick={onClick}>
    {title}
  </Link>
);

export const Header = ({ pages }: {pages: IPage[]}) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const items = useMemo(() => [HOME_PAGE, ...(pages || [])], [pages]);

  const timeUntilWedding = useMemo(() => {
    const days = Math.floor((WEDDING_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? `Faltan ${days} días para el gran día!` : "¡Hoy es el gran día!";
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => setIsSticky(window.scrollY > 100);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile]);

  const renderItem = (item: IPage) => (
    <li key={item.slug} className="mb-2 w-40">
      <MenuItem
        active={(router.asPath.includes(item.slug) && item.slug !== "") || (item.slug === '' && router.asPath === '/')}
        title={item.title}
        link={`/${item.slug}${isMobile ? "#content" : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      />
    </li>
  );

  return (
    <header className="py-10 text-center">
      <h1 className="text-4xl font-semibold tracking-widest mb-14 md:mb-14">
        Ana María & <br className="md:hidden"/> Juan Carlos
      </h1>
      {router.pathname !== "/" && (
        <div className="flex items-center justify-center mt-2 h-60 md:h-36">
          <p className="text-lg mb-2 text-gray-500 text-center h-20">
            {formatDate(WEDDING_DATE)} &bull; {WEDDING_PLACE}
            <br/><br/>
            <span className="text-2xl font-semibold">{timeUntilWedding}</span>
          </p>
        </div>
      )}
      <nav className={`p-2 md:p-2 max-w-screen-sm mx-auto ${isSticky ? 'hidden' : ''}`}>
        <ul className="flex flex-wrap justify-around text-sm font-semibold">
          {items.map(renderItem)}
        </ul>
      </nav>
      {isSticky && (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Ana María & Juan Carlos</h2>
            <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="p-1 bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#677870" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsDrawerOpen(false)} />
          <div className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
              <button onClick={() => setIsDrawerOpen(false)} className="mb-4 bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#677870" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <ul className="flex flex-col items-center">
                {items.map(renderItem)}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
