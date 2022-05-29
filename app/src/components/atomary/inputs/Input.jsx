import React from 'react';

const Input = ({ type, id, label, setValue, value, placeholder, required, right }) => {
    return (
        <div className="flex-row flex w-full items-center gap-8">
            <label htmlFor={id}>{label}</label>
            <input onChange={e => setValue(e.target.value)} value={value} type={type} id={id}
                   className={"bg-gray-50 p-8 border border-gray-300 text-gray-900 text-sm rounded-lg"}
                   placeholder={placeholder} required={required ? 'required' : ''} />
        </div>
    );
};

export default Input;