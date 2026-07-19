"use client";

import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { Check, Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";

function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: React.ReactNode }) {
  return (
    <label className="flex gap-2 items-start cursor-pointer group">
      <input type="checkbox" className="sr-only peer" {...props} />
      <span className="mt-1.5 w-4 h-4 shrink-0 rounded border border-border-input bg-bg-input flex items-center justify-center transition peer-checked:bg-accent-primary peer-checked:border-accent-primary peer-focus-visible:ring-2 peer-focus-visible:ring-accent-primary/50">
        <Check
          className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
          strokeWidth={3}
        />
      </span>
      <span className="text-text-secondary text-sm leading-relaxed">
        {label}
      </span>
    </label>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <div className="w-full max-w-[1000px] border border-border-input border-t-white/40 border-b-white/40 rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full min-h-[670px]">
        <div className="p-5 flex flex-col">
          <p className="text-3xl mb-5">logo</p>
          <p className="text-3xl mb-5">Создайте аккаунт</p>

          <form action={formAction} className="flex flex-col h-full">
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
                  minLength={6}
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
              <span className="text-text-secondary text-sm mt-1">
                минимум 6 символов
              </span>
            </label>

            <label className="flex flex-col mb-3">
              <span className="mb-2 text-text-secondary">
                Подтвердите пароль
              </span>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full border border-border-input bg-bg-input px-2 py-3 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition"
                  aria-label={
                    showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </label>

            <div className="flex flex-col gap-3 mb-5">
              <Checkbox
                label="Я соглашаюсь с условиями использования и политикой конфиденциальности"
                name="agreement"
                required
              />
              <Checkbox
                label="Подписаться на новости и акции"
                name="newsletter"
              />
            </div>

            {state?.error && (
              <p className="text-like text-sm text-center mb-3">
                {state.error}
              </p>
            )}

            <div className="flex flex-col items-center mt-auto">
              <button
                type="submit"
                disabled={isPending}
                className="px-12 py-3 bg-accent-primary text-white text-lg rounded-full w-fit mb-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-primary/75 cursor-pointer"
              >
                {isPending ? "Регистрация..." : "Зарегистрироваться"}
              </button>
              <div className="flex gap-2">
                <p className="text-base">Уже есть аккаунт?</p>
                <Link href="/auth/login" className="text-link">
                  Войти
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
