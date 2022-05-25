import { Outlet } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Head from '../components/atomary/typography/Head'

// Context
import { Context } from "../index";
import Grid from "../components/atomary/containers/Grid";
import Panel from "../components/atomary/viewers/Panel";
import Text from "../components/atomary/typography/Text";
import {UserIcon} from "@heroicons/react/outline";
import Icon from "../components/atomary/typography/Icon";

const AuthLayout = () => {
    return (
        <div className="login-layout h-screen items-start">
            <Grid GAP FULL COL NOGROW>
                <Panel>
                    <Grid VA="center" WRAP="no" GAP="gap-16">
                        <Icon><UserIcon /></Icon>
                        <Grid COL GAP VA="start">
                            <Head>Clients Controller</Head>
                            <Text>Sign in if you are a customer or administrator</Text>
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