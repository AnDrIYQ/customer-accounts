import React from 'react';
import Grid from "../atomary/containers/Grid";
import Head from "../atomary/typography/Head";
import Text from "../atomary/typography/Text";
import Panel from "../atomary/viewers/Panel";

const Footer = () => {
    return (
        <Panel>
            <Grid VA="center" HA="around">
                <Head>Clients Controller</Head>
                <Text>All Rights Reserved ©</Text>
            </Grid>
        </Panel>
    );
};

export default Footer;