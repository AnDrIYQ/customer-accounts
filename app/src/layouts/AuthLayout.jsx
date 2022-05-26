import { Outlet } from 'react-router-dom';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import Head from '../components/atomary/typography/Head'

// Context
import Grid from "../components/atomary/containers/Grid";
import Panel from "../components/atomary/viewers/Panel";
import {UserIcon} from "@heroicons/react/outline";
import Icon from "../components/atomary/typography/Icon";
import {Context} from "../index";

const AuthLayout = () => {
    const { authStore, appStore } = useContext(Context)

    return (
        <div onClick={() => appStore.finishLoading()} className={"login-layout h-screen items-start " + `${appStore.isLoading ? 'loading' : 'loading finished'}`}>
            <Grid GAP FULL COL NOGROW>
                <Panel>
                    <Grid VA="center" WRAP="no" GAP="gap-16">
                        <Icon><UserIcon /></Icon>
                        <Grid COL GAP VA="start">
                            <Head>Clients Controller</Head>
                        </Grid>
                    </Grid>
                </Panel>
                <div className="auth-wrapper">
                    <Outlet />
                </div>
            </Grid>
        </div>
    );
};

export default observer(AuthLayout);