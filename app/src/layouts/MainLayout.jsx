import {Outlet, useLocation} from 'react-router-dom';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Notifications from "../components/parts/Notifications";
import Modal from "../components/atomary/floats/Modal";
import eventHandlers from "../events/handlers";
import Header from "../components/parts/Header";
import Footer from "../components/parts/Footer";
import Sidebar from "../components/parts/SideBar";
import BreadCrumbs from "../components/parts/BreadCrumbs";
import Card from "../components/atomary/viewers/Card";
import Grid from "../components/atomary/containers/Grid";

const MainLayout = () => {
    const { authStore, appStore, notificationsStore, billingStore } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('app_token')) {
            authStore.checkAuth().then(() => {
                // Socket connect
                const SOCKET_URL = `http://31.131.24.72:3330`;
                const io = require('socket.io-client');
                // Global event bus
                const customer = JSON.parse(atob(localStorage.getItem('app_token')?.split('.')[1])).customer
                const chanel = customer?.id
                if (window.EVENT_BUS) {
                    return false;
                }
                window.EVENT_BUS = io.connect(SOCKET_URL, {
                    query: { roomName: chanel || false }
                });
                window.EVENT_BUS.on('connect', () => {
                    // Subscript on This account events
                    console.log('Connected to Event Bus... ');
                });
                // Messages init
                eventHandlers.apply(this, [window.EVENT_BUS, notificationsStore, billingStore, authStore]);
                notificationsStore.setNotifications(authStore?.user?.config?.notifications)
                if (authStore.user.admin) {
                    notificationsStore.message(`Welcome, ${authStore?.user?.admin?.username}`);
                } else {
                    notificationsStore.message(`Welcome, ${authStore?.user?.customer?.username}`);
                }
                // Theme color from config
                appStore.updateColor(authStore?.user?.config?.theme_color);
                appStore.finishLoading();
            });
        }
    }, [])

    return (
        <div className={"main-layout"}>
            <Notifications />
            <Modal />
            <Header />
            <Grid FULL WRAP="no" NOGROW VA={"start"}>
                <Sidebar />
                <Grid COL VA="start" customClasses={"my-32 max-w-4xl ml-0 md:mx-16"} GAP={"gap-16"}>
                    <BreadCrumbs />
                    <Card hfull wfull customClasses={"route-card"}>
                        <Outlet />
                    </Card>
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
};

export default observer(MainLayout);