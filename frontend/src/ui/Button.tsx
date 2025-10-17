import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: typeof LucideIcon;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-primary-500",
    secondary:
      "bg-gradient-to-r from-secondary-600/20 to-primary-600/20 hover:from-secondary-600/30 hover:to-primary-600/30 border border-secondary-500/30 hover:border-primary-500/40 text-secondary-300 hover:text-primary-300 hover:scale-[1.02] shadow-lg hover:shadow-secondary-500/10 focus:ring-secondary-500",
    success:
      "bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-success-500",
    warning:
      "bg-gradient-to-r from-warning-600 to-warning-500 hover:from-warning-700 hover:to-warning-600 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-warning-500",
    error:
      "bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-error-500",
    ghost:
      "text-neutral-400 hover:text-white hover:bg-neutral-800/50 focus:ring-neutral-500",
    outline:
      "border border-neutral-700 text-neutral-400 bg-neutral-800/50 hover:bg-neutral-700/50 hover:text-white focus:ring-neutral-500",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm gap-2",
    md: "px-4 py-3 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-3",
    xl: "px-8 py-4 text-lg gap-3",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-6 w-6",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <div
            className={`animate-spin rounded-full border-2 border-white border-t-transparent ${iconSizeClasses[size]}`}
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className={iconSizeClasses[size]} />
          )}
          {children}
          {Icon && iconPosition === "right" && (
            <Icon className={iconSizeClasses[size]} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
