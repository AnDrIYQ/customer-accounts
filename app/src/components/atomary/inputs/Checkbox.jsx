import React from 'react';
import {Switch} from "@material-ui/core";

const Checkbox = ({ id, label, setValue, checked }) => {
    const handleChange = (e) => {
        setValue(!!e.target.checked)
    };

    return <div className={"flex-row flex w-full items-center gap-8"}>
        <label>{ label }</label>
        <Switch id={id} label={label} defaultChecked={!!checked} onChange={(e) => handleChange(e)} />
    </div>;
};

export default Checkbox;