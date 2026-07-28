"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import UserMenu from "@/components/auth/UserMenu";
import { signOut } from "@/app/actions/auth";

interface HeaderClientProps {
  user: User | null;
}

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Книги" },
  { href: "#", label: "Моя полка" },
  { href: "#", label: "что-то ещё" },
];

export default function HeaderClient({ user }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ maxWidth: "1720px" }}
        animate={{ maxWidth: "1440px" }}
        transition={{
          delay: 1.5,
          type: "spring",
          stiffness: 120,
          damping: 14,
        }}
        className="  w-full fixed  left-1/2 -translate-x-1/2 mx-auto top-5 z-10 backdrop-blur-xl rounded-full "
      >
        <div className="flex justify-between items-center border border-border-input py-3 px-6 rounded-full">
          <div className="flex w-full justify-start gap-12 items-center">
            <div className="flex w-fit gap-2 shrink-1 items-center">
              <motion.div
                animate={{ rotate: [0, 820, 680, 690, 720] }}
                transition={{
                  delay: 0,
                  duration: 1.4,
                  times: [0, 0.8, 1],
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/logo-64x.svg"
                  alt="logotype"
                  width={32}
                  height={32}
                />
              </motion.div>
              <span className="font-light">Foliant</span>
            </div>
            <nav className="hidden md:flex flex-1 gap-6 text-[14px] text-white/70 font-light justify-start">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex gap-2.5 flex-1 justify-end items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-white hover:text-accent-primary transition cursor-pointer"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>

            {user ? (
              <div className="hidden md:block">
                <UserMenu user={user} />
              </div>
            ) : (
              <div className="hidden md:flex gap-2.5 items-center">
                <Link href="/auth/register">
                  <button className="border border-accent-primary rounded-full px-4 py-2 hover:bg-accent-primary cursor-pointer transition-colors duration-400 ease">
                    Присоединиться
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button className="bg-white rounded-full text-black px-4 py-2 cursor-pointer">
                    Войти
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-bg-secondary/95 backdrop-blur-xl z-50 p-6 shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo-64x.svg"
                    alt="logotype"
                    width={32}
                    height={32}
                  />
                  <span className="font-light text-lg">Foliant</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white hover:text-accent-primary transition cursor-pointer"
                  aria-label="Закрыть меню"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-white/70">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                {user ? (
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="w-full border border-border-input rounded-full px-4 py-3 text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      Выйти
                    </button>
                  </form>
                ) : (
                  <>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <button className="w-full border border-accent-primary rounded-full px-4 py-3 hover:bg-accent-primary transition-colors cursor-pointer">
                        Присоединиться
                      </button>
                    </Link>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <button className="w-full bg-white rounded-full text-black px-4 py-3 cursor-pointer">
                        Войти
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
