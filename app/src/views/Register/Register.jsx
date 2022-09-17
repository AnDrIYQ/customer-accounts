import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Card} from "flowbite-react";
import Grid from "../../components/atomary/containers/Grid";
import Head from "../../components/atomary/typography/Head";
import Text from "../../components/atomary/typography/Text";
import Input from "../../components/atomary/inputs/Input";
import Button from "../../components/atomary/typography/Button";
import { useNavigate } from "react-router-dom";
import Textarea from "../../components/atomary/inputs/Textarea";
import {UserAddIcon} from "@heroicons/react/solid";
import Icon from "../../components/atomary/typography/Icon";
import {observer} from "mobx-react-lite";


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    const {authStore} = useContext(Context);

    return (
        <Card className="max-w-sm cursor-pointer card">
            <Grid FULL VA="center" GAP="gap-16" COL>
                <Grid FULL VA="center" GAP COL>
                    <Icon><UserAddIcon /></Icon>
                    <Head>Реєстрація</Head>
                    <Text className="flex text-sm">Ласкаво просимо, зареєструйтесь будь-ласка</Text>
                </Grid>
                <Input required type={"text"} setValue={setUsername} value={username} label={"Ім'я"} placeholder={"Введіть своє ім'я"} />
                <Input required type={"email"}
                       value={email} setValue={setEmail} label={"Email"} id={"email"} placeholder={"example@email.com"} />
                <Input type={"password"}
                       required value={password} setValue={setPassword} label={"Пароль"} id={"password"} />
                <Textarea setValue={setBio} value={bio} label={"Про себе"} placeholder={"Не обов'язково"} />
                <Grid VA="center" FULL GAP WRAP HA="space" MG="mt-8">
                    <Button unwidth action={() => navigate('/login')}>Я вже клієнт</Button>
                    <Button unwidth action={() => authStore.register(email, password, username, bio)}>Підтвердити</Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default observer(Register);