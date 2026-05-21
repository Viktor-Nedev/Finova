import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "yellow" | "danger";
  children: ReactNode;
};

const variants = {
  primary: "bg-duo-green text-white border-duo-green shadow-[0_6px_0_#12813b] hover:bg-duo-green-dark",
  secondary: "bg-white text-duo-green border-duo-green/25 shadow-[0_5px_0_#d9eadf] hover:border-duo-green",
  yellow: "bg-duo-yellow text-duo-brown border-duo-yellow shadow-[0_6px_0_#d89b11] hover:bg-[#facc15]",
  danger: "bg-duo-red text-white border-duo-red shadow-[0_6px_0_#c83232] hover:bg-[#ef4444]",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-2xl border-2 px-5 py-3 text-base font-black transition active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-[0_5px_0_#cbd5e1] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
