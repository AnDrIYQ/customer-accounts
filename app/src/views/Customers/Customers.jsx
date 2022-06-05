import React, {useContext, useEffect, useState} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs, Toast} from "flowbite-react";
import Grid from "../../components/atomary/containers/Grid";
import {Context} from "../../index";
import {EyeIcon, EyeOffIcon, UsersIcon} from "@heroicons/react/outline";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import empty from "../../functions/empty";
import Panel from "../../components/atomary/viewers/Panel";
import Text from "../../components/atomary/typography/Text";
import DataTable from "../../components/atomary/structers/DataTable";
import {v4} from "uuid";
import {AnimationTypes, ComponentTransition, ComponentTransitionList, Presets} from "react-component-transition";
import Image from "../../components/atomary/typography/Image";
import {Avatar} from "@material-ui/core";
import Icon from "../../components/atomary/typography/Icon";
import {CalendarIcon, CashIcon, CheckIcon} from "@heroicons/react/solid";
import Collapse from "../../components/atomary/viewers/Collapse";
import Button from "../../components/atomary/typography/Button";
import Textarea from "../../components/atomary/inputs/Textarea";
import MessageService from "../../services/MessageService";
import dateFormat from "../../functions/date-format";
import Input from "../../components/atomary/inputs/Input";
import InvoiceService from "../../services/InvoiceService";
import Card from "../../components/atomary/viewers/Card";

const Customers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {authStore, appStore, billingStore, notificationsStore} = useContext(Context);

    const switchTab = (name) => {
        document.querySelector(`#${name}_tab`)?.click();
    };

    const [customers, setCustomers] = useState([]);
    const [customerColumns, setCustomerColumns] = useState([]);
    const [currentCustomer, setCurrent] = useState(null);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [invoiceDescription, setInvoiceDescription] = useState(`Charge from ${dateFormat(new Date())}`);

    const scrollMessages = () => {
        setTimeout(() => {
            window.$('#messages_container')
                .parents('button')
                ?.next()
                ?.find('.collapse').animate({scrollTop: window.$('#messages_container').parents('button')?.next()?.find('.collapse').get(0).scrollHeight}, 300)
        }, 700);
    };

    // Methods
    const sendMessage = () => {
        setNewMessage('');
        if (!empty(newMessage)) {
            const data = {
                to: currentCustomer._id,
                message: newMessage
            };
            MessageService.write(data).then(r => {
                billingStore.getMessages(currentCustomer._id).then(() => {
                    setMessages(billingStore.messages);
                    scrollMessages();
                })
            });
        }
    }
    const chargeAndInvoice = async () => {
        if (!invoiceDescription) {
            notificationsStore.error("Charging impossible without description")
        }
        const response = await InvoiceService.charge(invoiceDescription, currentCustomer._id);
        if (response) {
            notificationsStore.success("Charged new Invoice");
            navigate(location.pathname);
        }
    };
    const makePaid = (id, paid, was_read) => {
        if (!paid && was_read) {
            appStore.loadRoute();
            InvoiceService.pay(id).then(r => {
                setTimeout(() => {
                    appStore.loadRoute();
                    InvoiceService.fetch().then(r => appStore.makeRouteLoaded());
                    navigate(location.pathname);
                }, 500)
            })
        }
    };

    // Init Effect
    useEffect(() => {
        appStore.loadRoute();
        Promise.all([
            billingStore.getCustomers(0, null),
        ]).then(() => {
            appStore.makeRouteLoaded();
        })
    }, []);

    // Route update effect
    useEffect(() => {
        billingStore.getCustomers(0, null).then(list => {
            setCustomerColumns([
                'Picture', 'Username', 'Email', 'ID', 'Theme Color'
            ])
            setCustomers([
                ...list.map(customer => {
                    return [
                        {imageContent: customer.image, meta: {avatar: true}},
                        {text: customer.username, meta: {link: true, url: `/customers?id=${customer._id}`}},
                        {text: customer.email},
                        {text: customer._id},
                        {text: <span style={{color: customer.color}}>{customer.color}</span>},
                    ];
                })
            ] || [])
            setCurrent(list.filter(item => item._id === searchParams.get('id'))[0]);
        })
        if (searchParams.get('id')) {
            billingStore.getMessages(currentCustomer?._id).then(() => {
                setMessages(billingStore.messages);
                scrollMessages();
            })
            billingStore.getInvoices().then(r => {
                setInvoices([
                    ...r.filter(invoice => invoice?.customer === currentCustomer?._id)
                ])
            })
            switchTab('view');
        }
    }, [appStore.routeLoading])

    return (
        <div className={"tabs customers"}>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.admin &&
                    <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline"
                    >

                        <Tabs.Item
                            title={<span id={"list_tab"}>List</span>}
                            className="tab"
                            icon={UsersIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>Customers List</Text>
                                </Panel>
                                {!empty(customers) && <DataTable columns={customerColumns} rows={customers} />}
                                {empty(customers) && <Panel rounded><Text>No customers...</Text></Panel>}
                            </Grid>
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span id={"view_tab"}>View</span>}
                            className="tab with_messages"
                            icon={EyeIcon}
                            disabled={empty(searchParams.get('id'))}
                        >
                            <Grid GAP={"gap-8"} NOGROW FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>{currentCustomer?.username || "Customer's view"}</Text>
                                </Panel>

                                <ComponentTransition key={v4()} enterAnimation={AnimationTypes.fade.enter} exitAnimation={AnimationTypes.fade.exit}>
                                    {!!currentCustomer &&
                                        <Presets.TransitionFade key={v4()} className={"w-full"}>
                                            <Toast key={v4()} className="space-x-4 p-16 mr-0 flex-nowrap divide-x divide-gray-200 dark:divide-gray-700">
                                                <Grid COL MG GAP customClasses={"grow-0"}>
                                                    {!!currentCustomer.image ? <Image mini avatar src={currentCustomer.image} /> : <Image><Avatar /></Image>}
                                                    <span className={"text-lg text-center"}>{currentCustomer.username}</span>
                                                </Grid>
                                                <div className="pl-8 pr-4 text-sm font-normal h-full flex-col justify-start items-start self-end gap-8">
                                                    <span className={"text-lg mt-32"}><b>Email:</b> {currentCustomer.email}</span>
                                                    <span className={"text-lg"}><b>About:</b> {currentCustomer.bio}</span>
                                                    <span className={"text-lg mb-32"}><b>Color:</b> <span style={{color: currentCustomer.color}}>{currentCustomer.color}</span></span>
                                                </div>
                                            </Toast>
                                        </Presets.TransitionFade>
                                    }
                                </ComponentTransition>

                                <Collapse opened title={<span id={"messages_container"}>Communications</span>}>
                                    {empty(messages) && <span>Messages will be here...</span>}
                                    {!empty(messages) && messages.map(message =>
                                        <Toast key={message._id} className="space-x-4 p-16 mr-0 flex-nowrap max-w-xl divide-x divide-gray-200 dark:divide-gray-700">
                                            <Grid COL MG GAP customClasses={"grow-0"}>
                                                {!!message.from_image ? <Image mini avatar src={message.from_image} /> : <Image><Avatar /></Image>}
                                                <span className={"text-lg text-center"}>{message.from}</span>
                                            </Grid>
                                            <div className="pl-8 text-sm font-normal h-full flex-col justify-start items-start self-end gap-8">
                                                <span className={"text-lg"} style={{minHeight: '64px'}}>{message.message}</span>
                                                <Grid FULL GAP HA={"end"} VA={"center"}>
                                                    <div className={"rounded px-4 py-12 gap-4 flex justify-center items-center max-w-date"}>
                                                        <Icon mini><CalendarIcon /></Icon>
                                                        <span>{new Date(message.date).toLocaleString()}</span>
                                                    </div>
                                                </Grid>
                                            </div>
                                        </Toast>)
                                    }
                                    <Grid FULL NOGROW WRAP={"no"} GAP VA={"center"}>
                                        <Textarea placeholder={"Write a message"} setValue={setNewMessage} value={newMessage} />
                                        <Button action={sendMessage}>Send</Button>
                                    </Grid>
                                </Collapse>

                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>{currentCustomer?.username + "'s invoices" || "Customer's invoices"}</Text>
                                </Panel>
                                <Grid FULL NOGROW WRAP={"no"} GAP VA={"center"}>
                                    <Input placeholder={"Invoice description"} setValue={setInvoiceDescription} value={invoiceDescription} />
                                    <Button action={chargeAndInvoice}>Charge</Button>
                                </Grid>
                                <Grid FULL GAP VA={"center"}>
                                    {!empty(invoices) && invoices.map(invoice => <Card key={v4()} customClasses={"p-12 mt-8 flex !justify-start !items-start"}>
                                        <span>№: {invoice.number}</span>
                                        <span><b>{invoice.description}</b></span>
                                        <span>Date: {dateFormat(new Date(invoice.date_of_charge))}</span>
                                        <span>Total: {invoice.price}</span>
                                        <span onClick={() => makePaid(invoice._id, invoice.paid, invoice.was_read)} className={"self-end mt-8 theme_color py-4 px-16 rounded flex flex-nowrap gap-4 items-center"}>
                                            <b>{!invoice.paid && invoice.was_read ? `Make Paid` : ''}</b>
                                            <b>{!invoice.was_read && `Not seen`}</b>
                                            {!invoice.paid && invoice.was_read && <Icon mini><CashIcon/></Icon>}
                                            {!invoice.paid && !invoice.was_read && <Icon mini><EyeOffIcon/></Icon>}

                                            <b>{invoice.was_read && invoice.paid ? "Paid" : ''}</b>
                                            {invoice.paid && <Icon mini><CheckIcon/></Icon>}
                                        </span>
                                    </Card>)}
                                    {empty(invoices) && <span className={"mt-16"}>No invoices...</span>}
                                </Grid>
                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default Customers;