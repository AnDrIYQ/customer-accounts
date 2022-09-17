import React, {useContext, useEffect, useState} from 'react';
import {Sidebar} from "flowbite-react";
import {
    AdjustmentsIcon,
    CashIcon,
    ChatAltIcon,
    HomeIcon,
    LogoutIcon, ServerIcon,
    TableIcon,
    UserGroupIcon
} from "@heroicons/react/solid";
import {v4} from "uuid";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {CurrencyDollarIcon} from "@heroicons/react/outline";

const SideBar = () => {
    const navigate = useNavigate();
    const { authStore, appStore } = useContext(Context);
    const [menu, setMenu] = useState([
        {title: 'Головна', to: '/', icon: HomeIcon, label: 'Home'},
        {title: 'Налаштування', to: '/config', icon: AdjustmentsIcon }
    ]);

    useEffect(() => {
        if (authStore.user.customer) {
            setMenu([
                {title: 'Головна', to: '/', icon: HomeIcon, label: 'Home'},
                {title: 'Повідомлення', to: '/messages', icon: ChatAltIcon},
                {title: 'Сервіси', to: '/services', icon: ServerIcon},
                {title: 'Рахунки', to: '/invoices', icon: CashIcon },
                {title: 'Налаштування', to: '/config', icon: AdjustmentsIcon },
                {title: 'Вийти', to: '/logout', icon: LogoutIcon }
            ])
        } else {
            setMenu([
                {title: 'Головна', to: '/', icon: HomeIcon, label: 'Home'},
                {title: 'Клієнти', to: '/customers', icon: UserGroupIcon},
                {title: 'Тарифи', to: '/tariffs', icon: TableIcon },
                {title: 'Валюти', to: '/currencies', icon: CurrencyDollarIcon },
                {title: 'Налаштування', to: '/config', icon: AdjustmentsIcon },
                {title: 'Вийти', to: '/logout', icon: LogoutIcon }
            ])
        }
    }, []);

    const clickHandler = (to) => {
        if (to === '/logout') {
            authStore.logout().then(() => {
                navigate('/login')
            });
            return false;
        }
        navigate(to)
    }

    return (
        <div className={"grow-0 h-screen" + `${appStore.sideBarOpened ? ' sidebar-opened ': ' '}`}>
            <Sidebar
                className={"!bg-gray-50"}
                collapsed={false}
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {menu.map(item => <Sidebar.Item
                                key={v4()}
                                icon={item.icon}
                                onClick={() => clickHandler(item.to)}
                                label={item.label}
                                labelColor="gray"
                                className={"cursor-pointer"}
                            >
                                {item.title}
                            </Sidebar.Item>
                        )}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default observer(SideBar);