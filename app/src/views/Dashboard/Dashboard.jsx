import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Tabs} from 'flowbite-react';
import {EyeIcon} from "@heroicons/react/solid";
import {UsersIcon} from "@heroicons/react/outline";
import Preloaded from "../../components/atomary/containers/Preloaded";
import Card from "../../components/atomary/viewers/Card";
import Grid from "../../components/atomary/containers/Grid";
import Head from "../../components/atomary/typography/Head";
import Text from "../../components/atomary/typography/Text";
import Icon from "../../components/atomary/typography/Icon";
import { DataGridPro } from '@mui/x-data-grid-pro';

function Dashboard() {
    const {authStore, appStore, billingStore} = useContext(Context);

    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];

    const columns = [
        { field: 'col1', headerName: 'Column 1', width: 150 },
        { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

    useEffect(() => {
        appStore.loadRoute();
        Promise.all([
            billingStore.getCustomers(0, ''),
            billingStore.getTariffs(0, ''),
        ]).then(() => {
            appStore.makeRouteLoaded();
        });
    }, [])

    return (
        <div className={"tabs"}>
            <Preloaded loading={appStore.routeLoading}>
                <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline"
                >
                    <Tabs.Item title="View"
                               className="tab"
                               icon={EyeIcon}
                    >
                        <Grid GAP={"gap-8"}>
                            <Card customClasses={"max-w-sm theme_color"}>
                                <Grid PD GAP VA={"center"} HA={"space"}>
                                    <Grid GAP VA={"end"}>
                                        <Head customClasses={"!text-4xl"}>{billingStore.customersCount()}</Head>
                                        <Text>customers on service </Text>
                                    </Grid>
                                    <Icon><UsersIcon /></Icon>
                                </Grid>
                            </Card>
                            <Card customClasses={"max-w-sm theme_color"}>
                                <Grid PD GAP VA={"center"} HA={"space"}>
                                    <Grid GAP VA={"end"}>
                                        <Head customClasses={"!text-4xl"}>{billingStore.tariffsCount()}</Head>
                                        <Text>customers on service </Text>
                                    </Grid>
                                    <Icon><UsersIcon /></Icon>
                                </Grid>
                            </Card>
                        </Grid>

                        <DataGridPro
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Tabs.Item>
                </Tabs.Group>
            </Preloaded>
        </div>
    )
}

export default observer(Dashboard);