import React from 'react';

const Input = ({ type, id, label, setValue, value, placeholder, required, right, disabled }) => {
    return (
        <div className="flex-row flex w-full items-center gap-8">
            <label htmlFor={id}>{label}</label>
            <input readOnly={disabled} disabled={disabled} onChange={e => setValue(e.target.value)} value={value} type={type} id={id}
                   className={"bg-gray-50 p-8 border border-gray-300 text-gray-900 text-sm rounded-lg " + `${disabled ? 'cursor-not-allowed' : ''}`}
                   placeholder={placeholder} />
        </div>
    );
};

export default Input;