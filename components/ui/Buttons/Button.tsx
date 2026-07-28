"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode, type Ref } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-white hover:bg-accent-primary/90 focus:ring-accent-primary/50",
  secondary:
    "bg-bg-secondary border-white/75 border text-white hover:border-white focus:ring-secondary-stroke",
  outline:
    "bg-transparent border border-accent-primary text-white hover:bg-accent-primary focus:ring-secondary-stroke",
  ghost:
    "bg-transparent text-white hover:bg-white/5 focus:ring-secondary-stroke",
  danger: "bg-like text-white hover:bg-like/90 focus:ring-like/50",
};

function Button(
  {
    variant = "primary",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    children,
    className = "",
    type = "button",
    ...props
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-full font-medium transition group",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        "px-6 py-3 gap-2",
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon && (
        <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
