import { Outlet } from 'react-router-dom';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import {ComponentTransition, AnimationTypes} from 'react-component-transition';
import Notifications from "../components/parts/Notifications";
import Modal from "../components/atomary/floats/Modal";

const MainLayout = () => {
    const { authStore, appStore } = useContext(Context)

    return (
        <div onClick={() => appStore.finishLoading()} className={`${appStore.isLoading ? 'loading' : 'loading finished'}`}>
            <Notifications />
            <Modal />
            <Outlet />
        </div>
    );
};

export default observer(MainLayout);