import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Page } from "@/pages/api/pages";

type MenuItem = {
  name: string,
  link: string
}

export const Header = ({ pages }: { pages: Page[] }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            onClick={() => setMenuOpen(false)}
            className={`menu-item cursor-pointer block mt-4 lg:inline-block lg:mt-0 ${active ? "active" : "text-black"} mr-4`}>
        {name}
      </Link>
    )
  }

  return (
    <nav className="px-16 py-6 flex justify-around">
      <div className="mr-6 px-6 flex items-center">
        <span className="font-semibold text-2xl text-black whitespace-break-spaces">{`Ana María y Juan Carlos`}</span>
      </div>
      {isMobile ? (
        <div className="flex flex-grow justify-end lg:hidden">
          <div className="relative inline-block text-left flex items-center">
            <div>
              <button type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
                      id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => setMenuOpen(!menuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-grow justify-end lg:w-auto flex items-center">
          {pages.map((item) => (
            <MenuItem active={router.asPath.includes(item.slug)} key={item.id} name={item.title}
                      link={`/${item.slug}`}/>
          ))}
        </div>
      )}
      {menuOpen && isMobile && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-10">
          <div className="flex flex-col items-center justify-center h-full">
            {pages.map((item) => (
              <MenuItem active={router.asPath.includes(item.slug)} key={item.id} name={item.title}
                        link={`/${item.slug}`}/>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
