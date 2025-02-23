import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    label: string;
    error?: string;
    type?: string;
    as?: 'input' | 'textarea' | 'select';
    children?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    className = '',
    as = 'input',
    children,
    ...props
}) => {
    const Component = as;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <Component
                {...props}
                className={`w-full px-3 py-2 border rounded-lg ${
                    error ? 'border-red-500' : 'border-gray-300'
                } ${className}`}
            >
                {children}
            </Component>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};
