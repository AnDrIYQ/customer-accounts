import React, {useEffect, useState} from 'react';
import {Select, Label} from 'flowbite-react';

const SelectField = ({ variants, label, required, id }) => {
    return <div className={"flex gap-16 items-center flex-row select-container"}>
        <label htmlFor={id}>{label}</label>
        <Select
            id={id}
            required={required}
        >
            {variants && variants.map(element => <option value={element.value}>{element.text}</option>)}
        </Select>
    </div>;
};

export default SelectField;