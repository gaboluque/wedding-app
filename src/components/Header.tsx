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
  <Link href={link} className={`menu-item cursor-pointer block lg:inline-block ${active ? "active" : "text-black"}`}
        scroll={false} onClick={onClick}>
    {title}
  </Link>
);

export const Header = ({ pages }: { pages: IPage[] }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const items = useMemo(() => [HOME_PAGE, ...(pages || [])], [pages]);
  const adminItems = useMemo<IPage[]>(() => {
    return [
      HOME_PAGE,
      {
        id: 'payments',
        title: 'Pagos',
        slug: 'admin/payments',
        content: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'products',
        title: 'Productos',
        slug: 'admin/products',
        content: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }, []);

  const timeUntilWedding = useMemo(() => {
    const days = Math.floor((WEDDING_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? `¡Faltan ${days} días para el gran día!` : "¡Hoy es el gran día!";
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
        link={`/${item.slug}`}
        onClick={() => setIsDrawerOpen(false)}
      />
    </li>
  );

  return (
    <header className="py-10 text-center">
      <h1 className="text-4xl font-semibold tracking-widest mb-3 md:mb-14">
        <img src="/images/logo.png" alt="Ana María & Juan Carlos" className="w-40 mx-auto"/>
      </h1>
      {!router.pathname.includes("admin") ? (
        <div className="flex items-center justify-center my-2 mb-10 h-44 md:h-36 mx-5">
          <p className="text-lg mb-2 text-gray-500 text-center h-20">
            {formatDate(WEDDING_DATE)} <br/> {WEDDING_PLACE}
            <br/><br/>
            <span className="text-2xl font-semibold">{timeUntilWedding}</span>
          </p>
        </div>) : null}
      <nav
        className={`p-2 px-5 md:p-2 max-w-screen-sm mx-auto ${isSticky ? 'p-4 pb-0 fixed top-0 left-0 right-0 bg-white shadow-md z-50' : ''}`}>
        <ul className="flex flex-wrap justify-around text-sm font-semibold">
          {!router.pathname.includes("admin") ? items.map(renderItem) : adminItems.map(renderItem)}
        </ul>
      </nav>
    </header>
  );
};
