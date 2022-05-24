import { Outlet } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";

// Context
import { Context } from "../index";

const AuthLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default observer(AuthLayout);