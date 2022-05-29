import React, {useContext, useEffect} from 'react';
import {Navbar, Avatar} from "flowbite-react";
import {Context} from "../../index";
import Icon from "../atomary/typography/Icon";
import {UserAddIcon, UserIcon, XIcon} from "@heroicons/react/solid";
import Grid from "../atomary/containers/Grid";
import {useNavigate} from "react-router-dom";
import Image from "../atomary/typography/Image";
import {MenuAlt2Icon} from "@heroicons/react/outline";
import {observer} from "mobx-react-lite";

const Header = () => {
    const { authStore, appStore } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        appStore.closeSideBar();
    }, [])

    const open = () => {
        appStore.openSideBar()
    }
    const close = () => {
        appStore.closeSideBar()
    }

    return (
        <Navbar
            fluid={true}
            className={"theme_color w-full gap-8 shadow-lg"}
        >
            {!appStore.sideBarOpened ?
                <div className={"burger grow-0"} onClick={open}><Icon customClasses={"cursor-pointer mr-8"} ><MenuAlt2Icon /></Icon></div> :
                <div className={"burger grow-0"} onClick={close}><Icon customClasses={"cursor-pointer mr-8"} ><XIcon /></Icon></div>
            }
            <Icon customClasses={"mr-4"}>
                {authStore?.user?.admin ? <UserAddIcon /> : <UserIcon />}
            </Icon>
            <Navbar.Brand href={"/#"} onClick={(e) => {e.preventDefault(); navigate('/')}}>
                <Grid GAP="gap-16" VA="center">
                    <span className="self-center whitespace-nowrap text-xl font-semibold">
                    {authStore.user.admin ? 'Admin panel' : 'Customer panel'}
                </span>
                </Grid>
            </Navbar.Brand>
            <div className="mr-16 justify-end cursor-pointer" onClick={() => navigate('/config')}>
                <Image mini avatar src={authStore?.user?.config?.image} />
            </div>
        </Navbar>
    );
};

export default observer(Header);