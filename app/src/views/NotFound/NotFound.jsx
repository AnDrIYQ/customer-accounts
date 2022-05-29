import React from 'react';
import Card from "../../components/atomary/viewers/Card";
import Head from "../../components/atomary/typography/Head";
import Text from "../../components/atomary/typography/Text";
import Button from "../../components/atomary/typography/Button";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return <Card customClasses={"py-32 gap-16"} >
        <Head>404</Head>
        <Text>This route is not found</Text>
        <Button action={() => navigate('/')}>Go Home</Button>
    </Card>
};

export default NotFound;