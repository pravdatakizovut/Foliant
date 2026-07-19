"use client";

import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signIn, null);

  return (
    <div className="w-full max-w-[1000px] border border-border-input border-t-white/40 border-b-white/40 rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full min-h-[670px]">
        <div className="p-5 flex flex-col">
          <p className="text-3xl mb-5">logo</p>
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
              <p className="text-like text-sm text-center mb-3">{state.error}</p>
            )}

            <div className="flex flex-col items-center mt-auto">
              <button
                type="submit"
                disabled={isPending}
                className="px-12 py-3 bg-accent-primary text-white text-lg rounded-full w-fit mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Вход..." : "Войти"}
              </button>
              <div className="flex gap-2">
                <p className="text-base">Нет аккаунта?</p>
                <Link href="/auth/register" className="text-link">
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden md:block relative">
          <video
            src="/auth-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
