import React from 'react';

const Textarea = ({ id, label, setValue, value, placeholder, required }) => {
    return (
        <div className="grow-1 flex-row flex w-full items-start gap-8">
            <label htmlFor={id} className="flex items-center grow-1">{ label }</label>
            <textarea onChange={e => setValue(e.target.value)} value={value} id={id}
                   className="flex w-full p-8 border border-gray-300 text-gray-900 text-sm rounded-lg"
                   placeholder={placeholder} />
        </div>
    );
};

export default Textarea;