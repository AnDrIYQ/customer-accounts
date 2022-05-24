import { Outlet } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button} from 'flowbite-react';

// {/*<ComponentTransition*/}
// {/*    enterAnimation={AnimationTypes.fade.enter}*/}
// {/*    exitAnimation={AnimationTypes.fade.exit}*/}
// {/*>*/}
// {/*</ComponentTransition>*/}

import {ComponentTransition, AnimationTypes} from 'react-component-transition';
import Notifications from "../components/parts/Notifications";
import Modal from "../components/atomary/floats/Modal";

const MainLayout = () => {
    const { authStore } = useContext(Context)
    return (
        <>
            <Notifications />
            <Modal />
            <Outlet />
        </>
    );
};

export default observer(MainLayout);