import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Page } from "@/pages/api/pages";

type MenuItem = {
  name: string,
  link: string
}

const WEDDING_DATE = new Date("2024-12-07T00:00:00Z");
const WEDDING_PLACE = "Hacienda Fagua, Cajicá";

export const Header = ({ pages }: { pages: Page[] }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Actively listen for window resize events
  useEffect(() => {
    if(typeof window !== "object") return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
    return time > 0 ? `${time} días para que amarren a Otón` : "¡Hoy es el gran día!";
  }, []);

  return (
    <header className="py-10 text-center">
      <h1 className="text-4xl font-semibold tracking-widest">
        Ana María & <br className="md:hidden"/> Juan Carlos
      </h1>
      <div className="flex items-center justify-center mt-2 h-60 md:h-36">
        <p className="text-lg text-gray-500 text-center h-20">
          {WEDDING_DATE.toLocaleDateString('es', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} &bull; {WEDDING_PLACE}<br/>
          {timeUntilWedding}
        </p>
      </div>
      <nav className="max-w-screen-sm mx-auto">
        <ul className="flex flex-wrap justify-around text-sm font-semibold">
          {pages.map((item) => (
            <li key={item.slug} className="mb-2 w-40">
              <MenuItem
                active={router.asPath.includes(item.slug)}
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
