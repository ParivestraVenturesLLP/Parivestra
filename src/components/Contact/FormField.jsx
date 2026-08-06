import React from 'react';

const FormField = ({ label, name, type = 'text', placeholder, value, onChange, required = true }) => {
    return (
        <div className="space-y-2 w-full">
            <label className="text-[12px] font-bold uppercase tracking-wider text-[#FF4500]">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`
                    w-full bg-transparent border-b-2 border-(--pari-border) py-3 px-1
                    text-(--pari-text-primary) placeholder:text-(--pari-text-secondary)/50
                    focus:outline-none focus:border-[#FF4500] hover:border-[#FF4500]/60
                    transition-all duration-300 group
                `}
            />
        </div>
    );
};

export default FormField;
