"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiCompass, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const adminExtraLinks = [
  { href: "/packages/add", label: "Add Package" },
  { href: "/packages/manage", label: "Manage Packages" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const links = user?.role === "admin" ? [...loggedOutLinks, ...adminExtraLinks] : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-lagoon/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold text-lagoon">
          <FiCompass className="text-amber" size={26} />
          TourNest
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber ${
                pathname === link.href ? "text-amber" : "text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-lagoon/20 text-charcoal transition hover:bg-lagoon-light"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-amber"
              >
                {user.photoURL ? (
                  <span className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src={user.photoURL} alt={user.name} fill className="object-cover" unoptimized />
                  </span>
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lagoon-light text-xs font-semibold text-lagoon">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                Hi, {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-lagoon px-4 py-2 text-sm font-semibold text-lagoon transition hover:bg-lagoon hover:text-sand"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-lagoon transition hover:text-amber"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-lagoon px-5 py-2 text-sm font-semibold text-sand transition hover:bg-lagoon-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-lagoon/20 text-charcoal"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-lagoon/10 bg-background px-5 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-lagoon-light"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-lagoon/10 pt-3">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-lagoon-light"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-full border border-lagoon px-4 py-2 text-sm font-semibold text-lagoon"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-lagoon px-4 py-2 text-center text-sm font-semibold text-lagoon"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-lagoon px-4 py-2 text-center text-sm font-semibold text-sand"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
