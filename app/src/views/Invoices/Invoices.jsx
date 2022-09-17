import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import Panel from "../../components/atomary/viewers/Panel";
import Text from "../../components/atomary/typography/Text";
import empty from "../../functions/empty";
import Grid from "../../components/atomary/containers/Grid";
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from 'flowbite-react';
import {CheckIcon, ClipboardListIcon, ClockIcon, EyeOffIcon} from "@heroicons/react/solid";
import Card from "../../components/atomary/viewers/Card";
import {v4} from "uuid";
import dateFormat from "../../functions/date-format";
import {ListGroup} from "flowbite-react";
import Icon from "../../components/atomary/typography/Icon";
import {EyeIcon} from "@heroicons/react/outline";
import InvoiceService from "../../services/InvoiceService";

const Invoices = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);
    const {authStore, appStore, billingStore, notificationsStore} = useContext(Context);

    const makeInvoiceRead = (id, was_read) => {
        if (!was_read) {
            appStore.loadRoute();
            InvoiceService.read(id).then(r => {
                setTimeout(() => {
                    billingStore.getCustomerInvoices(0, null).then(() => {
                        appStore.makeRouteLoaded();
                        navigate(location.pathname);
                    })
                }, 500);
            })
        }
    };

    useEffect(() => {
        appStore.loadRoute();
        Promise.all([
            billingStore.getCustomerInvoices(0, null)
        ]).then(() => {
            setInvoices(billingStore.invoices);
            appStore.makeRouteLoaded();
        })
    }, []);

    useEffect(() => {
        billingStore.getCustomerInvoices(0, null).then(r =>
            setInvoices(billingStore.invoices))
        appStore.makeRouteLoaded();
    }, [appStore.routeLoading])

    return (
        <div className={"tabs customers"}>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.customer &&
                    <Tabs.Group
                        aria-label="Tabs with icons"
                        style="underline"
                    >

                        <Tabs.Item
                            title={<span id={"list_tab"}>Список</span>}
                            className="tab"
                            icon={ClipboardListIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>{authStore?.user?.customer?.username}, рахунки</Text>
                                </Panel>

                                <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"} customClasses={"flex-col-reverse"}>
                                    {!empty(invoices) && invoices.map(invoice => <Card key={v4()} customClasses={"items-start w-full"}>
                                        <h5 className="text-xl mb-8 mt-16 mx-8">
                                            <b>{invoice.description}</b>
                                        </h5>
                                        <p className="mx-8 mb-8">
                                            <b>Номер: </b>{invoice.number}
                                        </p>
                                        <p className={"mx-8 mb-8"}>
                                            Сума - {appStore.currencies.filter(currency => currency._id === authStore?.user?.config?.currency)[0]?.symbol || '$'}{invoice.price}
                                        </p>
                                        <Grid FULL GAP customClasses={"m-8"}>
                                            <ListGroup className="w-full p-8 m-8 mr-32">
                                                {!empty(invoice.items) && invoice.items.map(item =>
                                                    <ListGroup.Item key={v4()}>
                                                        Сервіс: {item.name}
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>

                                        </Grid>
                                        <Grid FULL>
                                            <p className={"mx-8 py-4 px-8 mb-8 theme_color rounded"}>
                                                Виставлено {dateFormat(new Date(invoice.date_of_charge))}
                                            </p>
                                            <p className={"mx-8 py-4 px-8 mb-8 theme_color rounded flex flex-nowrap items-center gap-4"}>
                                                {invoice.paid ? 'Оплачено' : 'Не оплачено'}
                                                {invoice.paid ? <Icon mini><CheckIcon /></Icon> : <Icon mini><ClockIcon /></Icon>}
                                            </p>
                                            <p onClick={() => makeInvoiceRead(invoice._id, invoice.was_read)} className={"mx-8 py-4 px-8 mb-8 theme_color rounded flex flex-nowrap items-center gap-4"}>
                                                {invoice.was_read ? 'Переглянуто' : 'Не переглянуто'}
                                                {invoice.was_read ? <Icon mini><EyeIcon /></Icon> : <Icon mini><EyeOffIcon /></Icon>}
                                            </p>
                                        </Grid>
                                    </Card>)}
                                    {empty(invoices) && <span>Немає рахунків...</span>}
                                </Grid>
                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default observer(Invoices);