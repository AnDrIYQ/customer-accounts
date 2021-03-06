import React, {useContext, useEffect, useState} from 'react';
import {Card} from "flowbite-react";
import {Context} from "../../index";
import Grid from "../../components/atomary/containers/Grid";
import Head from "../../components/atomary/typography/Head";
import Text from "../../components/atomary/typography/Text";
import Input from "../../components/atomary/inputs/Input";
import Button from "../../components/atomary/typography/Button";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/atomary/typography/Icon";
import {UserCircleIcon} from "@heroicons/react/solid";
import {observer} from "mobx-react-lite";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {authStore, appStore} = useContext(Context);

    useEffect(() => {
        appStore.finishLoading();
    }, [])

    return (
        <Card className="max-w-sm cursor-pointer card">
            <Grid VA="center" GAP="gap-16" COL>
                <Grid FULL VA="center" GAP="gap-16">
                    <Icon><UserCircleIcon /></Icon>
                    <Head>Login</Head>
                    <Text className="text-sm">Sign in if you are a customer or administrator</Text>
                </Grid>
                <Input required type={"email"}
                       value={email} setValue={setEmail} label={"Email"} id={"email"} placeholder={"example@email.com"} />
                <Input type={"password"}
                       required value={password} setValue={setPassword} label={"Password"} id={"password"} />
                <Grid VA="center" FULL GAP WRAP HA="space" MG="mt-8">
                    <Button unwidth action={() => navigate('/register')}>Register</Button>
                    <Button unwidth action={() => authStore.login(email, password)}>Login</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default observer(Login);