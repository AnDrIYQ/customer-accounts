import React, {useState} from 'react';
import Grid from "../atomary/containers/Grid";
import Head from "../atomary/typography/Head";
import {Card, Button} from "flowbite-react";

const AuthForm = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Card className="max-w-sm">
            <Grid VA="center" COL>
                <Head>{ type }</Head>
            </Grid>
        </Card>
    );
};

export default AuthForm;