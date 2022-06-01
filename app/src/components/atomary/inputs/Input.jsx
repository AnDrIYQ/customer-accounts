import React, {useState} from 'react';

const Input = ({ type, id, label, setValue, value, placeholder, custom, disabled, maxLength, spaced, innerRef, noFull }) => {
    const [customValue, setCustomValue] = useState(value);

    return (
        <div className={`flex-row flex ${!noFull ? 'w-full' : ''} items-center gap-8 ` + `${spaced ? 'justify-between' : ''}`}>
            <label htmlFor={id}>{label}</label>
            {!custom ?
                <input maxLength={maxLength} ref={innerRef} readOnly={disabled} disabled={disabled} onChange={e => setValue(e.target.value)} value={value} type={type} id={id}
                       className={"bg-gray-50 p-8 border border-gray-300 text-gray-900 text-sm rounded-lg " + `${disabled ? 'cursor-not-allowed ' : ''}`}
                       placeholder={placeholder} /> :
                <input maxLength={maxLength} ref={innerRef} readOnly={disabled} disabled={disabled} onChange={e => setCustomValue(e.target.value)} value={customValue} type={type} id={id}
                       className={"bg-gray-50 p-8 border border-gray-300 text-gray-900 text-sm rounded-lg " + `${disabled ? 'cursor-not-allowed ' : ''}`}
                       placeholder={placeholder} />
            }
        </div>
    );
};

export default Input;