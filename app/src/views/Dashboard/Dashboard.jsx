import React, {useContext, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {hexToHSL} from "../../functions/to-hsl";
import Button from "../../components/atomary/typography/Button";

function Dashboard() {
    const fileField = useRef(null);
    const {authStore} = useContext(Context);
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
            <Button action={() => authStore.logout()}>Logout</Button>
        </>
    );
}

export default observer(Dashboard);