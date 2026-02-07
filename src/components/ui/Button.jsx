import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: "bg-brand-violet text-white hover:bg-brand-violet/90 shadow-brand-violet/20",
        secondary: "bg-white border-2 border-brand-blue/10 text-brand-blue hover:bg-brand-blue/5 shadow-brand-blue/5",
        ghost: "bg-transparent text-brand-blue hover:bg-brand-blue/5",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5",
        lg: "px-8 py-3.5 text-lg",
    };

    return (
        <button
            className={twMerge(
                "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg",
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = "Button"

export default Button;
