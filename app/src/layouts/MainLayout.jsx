import { Outlet } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button} from 'flowbite-react';

import {ComponentTransition, AnimationTypes} from 'react-component-transition';

const MainLayout = () => {
    const { authStore } = useContext(Context)
    return (
        <>
            <ComponentTransition
                enterAnimation={AnimationTypes.fade.enter}
                exitAnimation={AnimationTypes.fade.exit}
            >
                {authStore.isAuth ?
                    <>
                        <h1 className="text-white text-xl m-4">Користувач {authStore.user.email} увійшов</h1>
                        <Button color="light" className="m-4" onClick={() => authStore.logout()}>Вийти</Button>
                    </>
                    :
                    <span className="text-red-500">Не авторизовано</span>
                }
            </ComponentTransition>
            <Outlet />
        </>
    );
};

export default observer(MainLayout);