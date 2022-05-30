import React from 'react';

const File = ({ id, label, setValue, innerRef }) => {
    return (
        <div className="flex-row flex w-full items-center gap-8">
            <label htmlFor={id}>{label}</label>
            <input ref={innerRef} onChange={e => setValue(e)} type={"file"} id={id}
                   className={"bg-gray-50 p-8 border border-gray-300 text-gray-900 text-sm rounded-lg "}
                   />
        </div>
    );
};

export default File;