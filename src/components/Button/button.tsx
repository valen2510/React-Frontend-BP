import React, { FC } from "react"
import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "btn-primary" | "btn-secondary",
    disabled?: boolean,
    onClick?: () => void,
}

export const Button: FC<ButtonProps> = ({ children, variant, disabled, ...props}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={variant}
        >
            {children}
        </button>
    )
}
