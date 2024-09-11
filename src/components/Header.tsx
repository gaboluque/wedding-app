import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IPage } from "@/models/Page";

type MenuItem = {
  name: string,
  link: string
}

// GMT-5
const WEDDING_DATE = new Date("2024-12-07T17:00:00-05:00");
const WEDDING_PLACE = "Hacienda Fagua, Cajicá";

export const Header = ({ pages }: { pages: IPage[] }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const offset = window.scrollY;
        setIsSticky(offset > 100); // Adjust this value as needed
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobile]);

  const MenuItem = ({ name, link, active }: MenuItem & { active: boolean }) => {
    if (!link) return null;

    return (
      <Link href={link}
            key={name}
            className={`menu-item cursor-pointer block lg:inline-block ${active ? "active" : "text-black"}`}>
        {name}
      </Link>
    )
  }

  const timeUntilWedding = useMemo(() => {
    const time = Math.floor((WEDDING_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return time > 0 ? `${time} días para el gran día!` : "¡Hoy es el gran día!";
  }, []);

  return (
    <header className={`py-10 text-center`}>
      <h1 className="text-4xl font-semibold tracking-widest">
        Ana María & <br className="md:hidden"/> Juan Carlos
      </h1>
      <div className="flex items-center justify-center mt-2 h-60 md:h-36">
        <p className="text-lg mb-2 text-gray-500 text-center h-20">
          {WEDDING_DATE.toLocaleDateString('es', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} &bull; {WEDDING_PLACE}
          <br/>
          <br/>
          <span className="text-2xl font-semibold">
            {timeUntilWedding}
          </span>
        </p>
      </div>
      <nav className={`py-2 max-w-screen-sm mx-auto ${isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md z-50' : ''}`}>
        <ul className="flex flex-wrap justify-around text-sm font-semibold">
          {[{
            id: 'home',
            title: 'Inicio',
            slug: ''
          }, ...pages].map((item) => (
            <li key={item.slug} className="mb-2 w-40">
              <MenuItem
                active={(router.asPath.includes(item.slug) && item.slug !== "") || (item.slug === '' && router.asPath === '/')}
                key={item.id}
                name={item.title}
                link={`/${item.slug}`}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
