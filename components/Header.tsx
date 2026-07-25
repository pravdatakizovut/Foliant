import Link from "next/link";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import UserMenu from "@/components/auth/UserMenu";
import Image from "next/image";

async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="fixed top-5 left-0 z-10 w-full">
      <div className="flex justify-between items-center foliant-container border border-border-input py-3 px-6 rounded-full glass-blur">
        <div className="flex gap-2 flex-1 items-center">
          <Image src="/logo-64x.svg" alt="logotype" width={32} height={32} />
          <span className="font-light ">Foliant</span>
        </div>
        <nav className="flex gap-8 flex-1 justify-center text-base font-light">
          <Link href="/">Главная</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="#">Моя полка</Link>
          <Link href="#">Моя полка</Link>
        </nav>
        <div className="flex gap-2.5 flex-1 justify-end items-center">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
