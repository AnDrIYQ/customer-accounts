import React, {useContext, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Button} from "flowbite-react";
import {hexToHSL} from "../../functions/to-hsl";

function Dashboard() {
    const fileField = useRef(null);

    // const uploadFile = () => {
    //     const data = new FormData();
    //     Object.values(fileField.current.files).forEach(file => {
    //         data.append("images", file);
    //     });
    //     data.append('name', 'Hello')
    //     FormService.send('/users', data).then(r => {
    //         return null;
    //     });
    // };

    return (
        <>
            <h1>Content</h1>
        </>
    );
}

export default observer(Dashboard);