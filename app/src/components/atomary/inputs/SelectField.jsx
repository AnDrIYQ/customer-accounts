import React, {useEffect, useState} from 'react';
import {Select, Label} from 'flowbite-react';
import {v4} from "uuid";

const SelectField = ({ variants, label, id, init, setValue }) => {
    return <div className={"flex gap-16 items-center flex-row select-container"}>
        <label htmlFor={id}>{label}</label>
        <Select
            id={id}
            onChange={(e) => setValue(e.target.value)}
        >
            {variants &&
                variants.map(element =>
                    <option key={v4()} selected={init === element.value} value={element.value}>{element.text}</option>
                )
            }
        </Select>
    </div>;
};

export default SelectField;