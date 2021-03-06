import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Tabs} from 'flowbite-react';
import {CalculatorIcon, CashIcon, ChevronDoubleRightIcon, EyeIcon} from "@heroicons/react/solid";
import {ServerIcon, TableIcon, UsersIcon} from "@heroicons/react/outline";
import Preloaded from "../../components/atomary/containers/Preloaded";
import Card from "../../components/atomary/viewers/Card";
import Grid from "../../components/atomary/containers/Grid";
import Head from "../../components/atomary/typography/Head";
import Text from "../../components/atomary/typography/Text";
import Icon from "../../components/atomary/typography/Icon";
import Panel from "../../components/atomary/viewers/Panel";
import {AnimationTypes, ComponentTransitionList, Presets} from "react-component-transition";
import {useNavigate} from "react-router-dom";
import {v4} from "uuid";

function Dashboard() {
    const {authStore, appStore, billingStore} = useContext(Context);
    const [currency, setCurrency] = useState('$');
    const navigate = useNavigate();

    useEffect(() => {
        appStore.loadRoute();
        if (authStore.user.admin) {
            Promise.all([
                billingStore.getCustomers(0, ''),
                billingStore.getTariffs(0, ''),
            ]).then(() => {
                setTimeout(() => {
                    appStore.makeRouteLoaded();
                }, 400);
            });
        } else {
            Promise.all([
                billingStore.getServices(0, ''),
                billingStore.getCustomerInvoices(0, ''),
                billingStore.getMessages(authStore.user.customer.id),
                appStore.fetchConfig(),
                billingStore.getAdmins()
            ]).then(() => {
                appStore.currencies.map(item => {
                    if (item._id === authStore?.user?.config?.currency) {
                        setCurrency(item.symbol || item.name || '$');
                    }
                })
                setTimeout(() => {
                    appStore.makeRouteLoaded();
                }, 400);
            });
        }
    }, [])

    return (
        <div className={"tabs"}>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.admin && <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline"
                >
                    <Tabs.Item title="View"
                               className="tab"
                               icon={EyeIcon}
                    >
                        <Grid GAP={"gap-8"} NOGROW>
                            <Card customClasses={"max-w-sm theme_color"}>
                                <Grid PD GAP VA={"center"} HA={"space"} onClick={() => navigate(`/customers`)}>
                                    <Grid GAP VA={"end"}>
                                        <Head customClasses={"!text-4xl"}>{billingStore.customersCount()}</Head>
                                        <Text>customers on service </Text>
                                    </Grid>
                                    <Icon><UsersIcon /></Icon>
                                </Grid>
                            </Card>
                            <Card customClasses={"max-w-sm theme_color"} >
                                <Grid PD GAP VA={"center"} HA={"space"} onClick={() => navigate(`/tariffs`)}>
                                    <Grid GAP VA={"end"}>
                                        <Head customClasses={"!text-4xl"}>{billingStore.tariffsCount()}</Head>
                                        <Text> tarrifs active</Text>
                                    </Grid>
                                    <Icon><TableIcon /></Icon>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid FULL GAP={"gap-8"} NOGROW customClasses={"my-16"}>
                            <Head>Last customers</Head>
                            {!billingStore?.customers?.length && <span>There are no customers for service</span>}
                            {billingStore?.customers && billingStore?.customers?.slice(0, 5).map(customer => <Panel rounded key={v4()}>
                                <span>ID: {customer._id}</span>
                                Name: {customer.username} <Icon click={() => navigate(`/customers?id=${customer._id}`)}><ChevronDoubleRightIcon /></Icon>
                            </Panel>)}
                        </Grid>
                    </Tabs.Item>
                </Tabs.Group>}
            </Preloaded>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.customer && <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline"
                >
                    <Tabs.Item title="View"
                               className="tab"
                               icon={EyeIcon}>
                        <Grid GAP={"gap-8"} NOGROW>
                            <Card customClasses={"max-w-sm theme_color"}>
                                <Grid PD GAP VA={"center"} HA={"space"} onClick={() => navigate('/services')}>
                                    <Grid GAP VA={"end"}>
                                        <Head customClasses={"!text-4xl"}>{billingStore.servicesCount()}</Head>
                                        <Text>active services </Text>
                                    </Grid>
                                    <Icon><ServerIcon /></Icon>
                                </Grid>
                            </Card>
                            <Card customClasses={"max-w-sm theme_color"}>
                                <Grid PD GAP VA={"center"} HA={"space"} onClick={() => navigate('/invoices')}>
                                    <Grid GAP VA={"end"}>
                                        <Head customClasses={"!text-4xl"}>{billingStore.invoicesCount()}</Head>
                                        <Text>invoices charged </Text>
                                    </Grid>
                                    <Icon><CalculatorIcon /></Icon>
                                </Grid>
                            </Card>
                            <Card customClasses={"max-w-sm theme_color"}>
                                <Grid PD GAP VA={"center"} HA={"space"} onClick={() => navigate('/services')}>
                                    <Icon><CashIcon /></Icon>
                                    <Grid GAP VA={"end"}>
                                        <Text>Amount of debt: </Text>
                                        <Head customClasses={"!text-4xl"}>{(currency || '$') + billingStore.invoicesUnpaid()}</Head>
                                    </Grid>
                                    <span onClick={() => navigate('/services')} className={"theme_color p-4"}>Register service</span>
                                </Grid>
                            </Card>
                        </Grid>
                        <Head customClasses={"mt-8"}>Last messages</Head>
                        <Grid FULL GAP={"gap-8"} NOGROW customClasses={"my-16"}>
                            {!billingStore.messages.length && <span>No messages</span>}
                            <ComponentTransitionList key={v4()} enterAnimation={AnimationTypes.fade.enter} exitAnimation={AnimationTypes.fade.exit}>
                                {billingStore.messages && billingStore.messages.slice(0).reverse().slice(0, 5).map(message =>
                                    <Presets.TransitionFade key={message.message}>
                                        <Panel key={message.message} rounded>
                                            <span>{new Date(message.date).toDateString()}</span>
                                            <span>From: {message.from}</span>
                                            Message: {message.message.substring(0, 10) + '...'} <Icon click={() => navigate('/messages')}><ChevronDoubleRightIcon /></Icon>
                                        </Panel>
                                    </Presets.TransitionFade>
                                )}
                            </ComponentTransitionList>
                        </Grid>
                    </Tabs.Item>
                </Tabs.Group>}
            </Preloaded>
        </div>
    )
}

export default observer(Dashboard);