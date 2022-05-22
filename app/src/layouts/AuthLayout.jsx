import { Outlet } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AuthLayout = () => {
    return (
        <>
            <span>AuthLayout</span>
            <Outlet />
        </>
    );
};

export default observer(AuthLayout);