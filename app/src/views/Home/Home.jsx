import React, {useContext, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Button} from "flowbite-react";
import FormService from "../../services/FormService";

function Home(props) {
    const fileField = useRef(null);
    const {homeStore} = useContext(Context);

    const uploadFile = () => {
        const data = new FormData();
        Object.values(fileField.current.files).forEach(file => {
            data.append("images", file);
        });
        data.append('name', 'Hello')
        FormService.send('/users', data).then(r => {
            return null;
        });
    };

    return (
        <>
            <div className="flex items-start justify-start flex-col m-4">
                <h1 className="text-gray-400">Home content (Dashboard) with name {homeStore.userName}</h1>
                <input multiple ref={fileField} className="mt-4" type="file" name="image"/>
                <Button color="dark" className="mt-4" onClick={uploadFile}>Upload</Button>
            </div>
        </>
    );
}

export default observer(Home);