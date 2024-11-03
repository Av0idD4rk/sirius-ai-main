import React from 'react';

interface ButtonProps {
    children: React.ReactNode,
    variant: 'primary' | 'secondary',
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({children, variant, disabled}) => {
    const baseClasses = "px-8 py-4 rounded-[30px] text-base tracking-wide leading-none";
    const variantClasses = variant === 'primary'
        ? "text-white bg-gray-400 disabled"
        : "text-black bg-white";

    return (
        <button className={`${baseClasses} ${variantClasses}`} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;