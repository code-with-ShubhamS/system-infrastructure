// src/app/components/layout/header/ThemeToggle.tsx
'use client'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="theme toggler"
        className="group flex h-8 w-8 items-center justify-center duration-300"
      >
        <span className="group-hover:rotate-180 transition-transform duration-700 ease-in-out">
          <Icon icon="ri:sun-fill" width="24" height="24" />
        </span>
      </button>
    );
  }

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group flex h-8 w-8 items-center justify-center duration-300"
    >
      <span className="group-hover:rotate-180 transition-transform duration-700 ease-in-out">
        <Icon icon="ri:sun-fill" width="24" height="24" className="hidden dark:block"/>
        <Icon icon="ri:moon-fill" width="24" height="24" className="dark:hidden" style={{ color: '#000' }} />
      </span>
    </button>
  );
};

export default ThemeToggler;