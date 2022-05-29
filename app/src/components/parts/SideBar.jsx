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
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SideBar = () => {
    const navigate = useNavigate();
    const { authStore, appStore } = useContext(Context);
    const [menu, setMenu] = useState([
        {title: 'Dashboard', to: '/', icon: HomeIcon, label: 'Home'},
        {title: 'Config', to: '/config', icon: AdjustmentsIcon }
    ]);

    useEffect(() => {
        if (authStore.user.customer) {
            setMenu([
                {title: 'Dashboard', to: '/', icon: HomeIcon, label: 'Home'},
                {title: 'Messages', to: '/messages', icon: ChatAltIcon},
                {title: 'Services', to: '/services', icon: ServerIcon},
                {title: 'Invoices', to: '/invoices', icon: CashIcon },
                {title: 'Config', to: '/config', icon: AdjustmentsIcon },
                {title: 'Logout', to: '/logout', icon: LogoutIcon }
            ])
        } else {
            setMenu([
                {title: 'Dashboard', to: '/', icon: HomeIcon, label: 'Home'},
                {title: 'Customers', to: '/customers', icon: UserGroupIcon},
                {title: 'Tariffs', to: '/tariffs', icon: TableIcon },
                {title: 'Config', to: '/config', icon: AdjustmentsIcon },
                {title: 'Logout', to: '/logout', icon: LogoutIcon }
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
                                key={item.title}
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