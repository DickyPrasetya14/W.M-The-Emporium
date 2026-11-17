import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-sans uppercase tracking-[0.15em] text-xs font-medium transition-all duration-300 rounded-[2px] select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

  const variantStyles = {
    // Deep brown with subtle gold accent on hover
    primary:
      "bg-[#2A1D15] text-[#FAF6EE] border border-[#3A281E] hover:bg-[#3D2C20] hover:border-[#C59B4B] shadow-sm hover:shadow",
    // Cream parchment button with thin brown border
    secondary:
      "bg-[#FAF6EE] text-[#2A1D15] border border-[#8C6F56]/60 hover:bg-[#F2ECE1] hover:border-[#2A1D15] shadow-xs",
    // Subtle outline with classic border
    outline:
      "bg-transparent text-[#2A1D15] border border-[#3A281E]/60 hover:bg-[#2A1D15] hover:text-[#FAF6EE] hover:border-[#2A1D15]",
    // Antique gold highlight
    gold:
      "bg-[#C59B4B] text-[#1F1813] border border-[#9E762E] hover:bg-[#DFBF7A] hover:border-[#C59B4B] font-semibold shadow-sm",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-xs md:text-sm tracking-[0.2em]",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
