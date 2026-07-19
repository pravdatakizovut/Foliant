"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  const id = useId();
  const filterId = `glass-filter-${id}`;

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            {/* Базовое размытие фона */}
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />

            {/* Хроматическая аберрация: раздельный сдвиг R и B каналов */}
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="red"
            />
            <feOffset in="red" dx="-1.5" dy="0" result="redShift" />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="green"
            />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blue"
            />
            <feOffset in="blue" dx="1.5" dy="0" result="blueShift" />

            <feBlend in="redShift" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueShift" mode="screen" result="chromatic" />

            {/* Мелкая текстура / шум стекла */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0"
              result="noiseAlpha"
            />
            <feBlend
              in="chromatic"
              in2="noiseAlpha"
              mode="overlay"
            />
          </filter>
        </defs>
      </svg>

      {/* 
        Слой блюра. 
        inline-стиль с url(#filter) имеет более высокую специфичность и, 
        если браузер поддерживает SVG-фильтр в backdrop-filter, применяет его.
        Если не поддерживает — inline-стиль игнорируется, и остаётся glass-blur 
        (CSS blur + saturate).
      */}
      <div
        className="absolute inset-0 rounded-2xl glass-blur pointer-events-none"
        style={{
          backdropFilter: `url(#${filterId})`,
          WebkitBackdropFilter: `url(#${filterId})`,
        }}
      />

      {/* Тёплый градиентный тон поверх */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-amber-100/[0.04] to-transparent pointer-events-none" />

      {/* Светлая рамка */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
