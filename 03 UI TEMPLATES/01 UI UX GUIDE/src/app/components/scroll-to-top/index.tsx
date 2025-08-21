// src/app/components/scroll-to-top/index.tsx
'use client'
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-999">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="back-to-top flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-purple_blue text-white shadow-lg transition duration-300 ease-in-out hover:bg-purple_blue/80 hover:scale-110"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"></span>
        </div>
      )}
    </div>
  );
}