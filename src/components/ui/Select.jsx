import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Select = React.forwardRef(({ className, label, error, helperText, options = [], ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-semibold text-brand-blue ml-1">
                    {label}
                </label>
            )}
            <select
                className={twMerge(
                    "w-full px-4 py-2 bg-white border-2 border-brand-blue/10 rounded-xl focus:border-brand-violet outline-none transition-all duration-200 text-brand-blue appearance-none",
                    "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%230070BB%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat",
                    error && "border-red-500 focus:border-red-500",
                    className
                )}
                ref={ref}
                {...props}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
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

Select.displayName = "Select";

export default Select;
