import { Outlet } from 'react-router-dom';
import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button} from 'flowbite-react';

const MainLayout = () => {
    const { store } = useContext(Context)
    return (
        <div className="In main Layout">
            <h1 className="text-white text-xl m-4">{store.isAuth ? `Користувач ${store.user.email} увійшов` : 'Не авторизовано'}</h1>
            {store.isAuth && <Button color="light" className="m-4" onClick={() => store.logout()}>Вийти</Button>}
            <Outlet />
        </div>
    );
};

export default observer(MainLayout);