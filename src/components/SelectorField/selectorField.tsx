import React, { FC } from "react"
import './selectorField.css'

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: number[],
}

export const SelectorField: FC<SelectFieldProps> = ({options, ...props}) => {
    return (
        <select {...props}>
            {options.map((value, index) => (
                <option value={value} key={index}>
                    {value}
                </option>
            ))}
        </select>
    )
}
