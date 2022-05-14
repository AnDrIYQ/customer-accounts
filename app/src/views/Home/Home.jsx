import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

function Home(props) {
    const {homeStore} = useContext(Context);

    return (
        <>
            Home content (Dashboard) with name {homeStore.userName}
        </>
    );
}

export default observer(Home);