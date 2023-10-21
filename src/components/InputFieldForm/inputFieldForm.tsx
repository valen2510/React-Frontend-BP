import React, { FC } from "react"
import { InputField, InputFieldProps } from "components/InputField/inputField";
import './inputFieldForm.css';

interface InputFieldFormProps extends InputFieldProps {
    label: string,
    error?: string,
}

export const InputFieldForm: FC<InputFieldFormProps> = React.forwardRef(({label, error, ...props}, ref) => {
    return (
        <div className="field-form">
            <label>{label}</label>
            <InputField className={error ? 'error' : ''} itemRef={ref} {...props} />
            {error && (
                <div className="text-error">
                    {error}
                </div>
            )}
      </div>
    )
})
