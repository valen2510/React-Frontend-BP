import React, { FC} from "react"
import './inputField.css';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    itemRef?: any,
    disabled?: boolean,
}

export const InputField: FC<InputFieldProps> = ({ disabled, itemRef, ...props }) => {
    return (
        <input
            {...props}
            ref={itemRef}
            disabled={disabled}
        />
    )
}
