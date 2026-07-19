"use client";

import { User } from "@supabase/supabase-js";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Heart,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { signOut } from "@/app/actions/auth";

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initials = user.email
    ? user.email.split("@")[0].slice(0, 2).toUpperCase()
    : "U";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const menuItems = [
    { icon: UserIcon, label: "Профиль", href: "/profile" },
    { icon: BookOpen, label: "Моя полка", href: "#" },
    { icon: Heart, label: "Избранное", href: "#" },
    { icon: Settings, label: "Настройки", href: "#" },
  ];

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25,
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 28 },
    },
  };

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 0 : 0 }}
        className="w-10 h-10 rounded-full bg-bg-secondary border border-border-input text-accent-primary  flex items-center justify-center uppercase hover:bg-bg-input transition cursor-pointer"
        aria-label="Открыть меню пользователя"
      >
        {initials}
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-5 w-56 bg-[#1a1a20]/75 rounded-2xl overflow-hidden shadow-xl z-10  origin-top-right "
          >
            <motion.div
              variants={itemVariants}
              className="px-4 py-3 border-b border-border-input"
            >
              <p className="text-sm text-text-secondary truncate">
                {user.email}
              </p>
            </motion.div>

            <nav>
              {menuItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={itemVariants}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/5 transition"
                >
                  <item.icon className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm">{item.label}</span>
                </motion.a>
              ))}
            </nav>

            <motion.form
              variants={itemVariants}
              action={signOut}
              className="border-t border-border-input"
            >
              <motion.button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/5 transition cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-text-secondary" />
                <span className="text-sm">Выйти</span>
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
