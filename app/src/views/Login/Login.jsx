import React, {useContext, useState} from 'react';
import {Card} from "flowbite-react";
import {Context} from "../../index";
import Grid from "../../components/atomary/containers/Grid";
import AuthForm from "../../components/parts/AuthForm";

const Login = () => {
    const {authStore} = useContext(Context);

    const handleSubmit = (event) => {

    }

    return (
        <AuthForm
            handleSubmit={handleSubmit}
            type="Login"
        />
    );
};

export default Login;