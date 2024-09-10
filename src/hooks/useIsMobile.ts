import { useEffect, useState } from "react";


export const useIsMobile = () => {
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

  return isMobile;
}
