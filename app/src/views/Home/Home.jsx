import { ChatAltIcon } from "@heroicons/react/solid";

import React from 'react';
import {Navbar, Sidebar} from "flowbite-react";

function Home(props) {
    return (
        <>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="https://flowbite.com/">
                    {<ChatAltIcon className="w-10 h-10"></ChatAltIcon>}
                    <span className="ml-4">Logo</span>
                </Navbar.Brand>
            </Navbar>
            <Sidebar
                className="bg-green-300 !h-screen"
                collapsed={false}
            >
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href="#"
                            icon={ChatAltIcon}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Collapse
                            icon={ChatAltIcon}
                            label="E-commerce"
                        >
                            <Sidebar.Item href="#">
                                Products
                            </Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Item
                            href="#"
                            icon={ChatAltIcon}
                        >
                            Inbox
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={ChatAltIcon}
                        >
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={ChatAltIcon}
                        >
                            Products
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={ChatAltIcon}
                        >
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item
                            href="#"
                            icon={ChatAltIcon}
                        >
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar></>
    );
}

export default Home;