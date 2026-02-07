import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef(({ className, label, type, error, helperText, ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-semibold text-brand-blue ml-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={twMerge(
                    "w-full px-4 py-2 bg-white border-2 border-brand-blue/10 rounded-xl focus:border-brand-violet outline-none transition-all duration-200 placeholder:text-brand-blue/30 text-brand-blue",
                    error && "border-red-500 focus:border-red-500",
                    className
                )}
                ref={ref}
                {...props}
            />
            {(error || helperText) && (
                <p className={twMerge(
                    "text-xs ml-1 font-medium",
                    error ? "text-red-500" : "text-brand-blue/60"
                )}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
