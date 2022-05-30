import React, {useEffect, useState} from 'react';
import {Select, Label} from 'flowbite-react';

const SelectField = ({ variants, label, id, init, setValue }) => {
    return <div className={"flex gap-16 items-center flex-row select-container"}>
        <label htmlFor={id}>{label}</label>
        <Select
            id={id}
            onChange={(e) => setValue(e.target.value)}
        >
            {variants &&
                variants.map(element =>
                    <option key={element.value} selected={init === element.value} value={element.value}>{element.text}</option>
                )
            }
        </Select>
    </div>;
};

export default SelectField;