"use client";

import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Buttons/Button";
import { cn } from "@/lib/utils";
import { Skeleton } from "../_components/Skeleton";
import { motion } from "framer-motion";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [state, formAction, isPending] = useActionState(signIn, null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-bg-primary/30 backdrop-blur-2xl w-full max-w-250 border border-border-input border-t-white/40 border-b-white/40 rounded-3xl overflow-hidden z-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5  h-180">
        <div className="p-5 flex flex-col">
          <Link href="/">
            <Image
              src="/logo-64x.svg"
              alt="logotype"
              width={64}
              height={64}
              className="mb-5"
            />
          </Link>

          <p className="text-3xl mb-5">Войдите в аккаунт</p>

          <form action={formAction} className="flex flex-col h-full">
            <div className="flex flex-col">
              <label className="flex flex-col mb-3">
                <span className="mb-2 text-text-secondary">Почта</span>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  required
                  className="border border-border-input bg-bg-input px-2 py-3 rounded-xl"
                />
              </label>
              <label className="flex flex-col mb-3">
                <span className="mb-2 text-text-secondary">Пароль</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    required
                    className="w-full border border-border-input bg-bg-input px-2 py-3 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition"
                    aria-label={
                      showPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </label>
            </div>

            {state?.error && (
              <p className="text-like text-sm text-center mb-3">
                {state.error}
              </p>
            )}

            <div className="flex flex-col items-center mt-auto">
              <Button
                disabled={isPending}
                variant="primary"
                type="submit"
                className="mb-4 max-w-2/3"
                fullWidth
              >
                {isPending ? "Вход..." : "Войти"}
              </Button>
              <div className="flex gap-2">
                <p className="text-base text-text-secondary">Нет аккаунта?</p>
                <Link href="/auth/register" className="text-white">
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:block relative bg-bg-secondary">
          {!videoLoaded && (
            <Skeleton className="absolute inset-0 rounded-none" />
          )}
          <video
            src="/auth-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={cn(
              "object-cover w-full h-full transition-opacity duration-500",
              videoLoaded ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
