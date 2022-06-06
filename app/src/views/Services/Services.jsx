import React, {useContext, useEffect, useState} from 'react';
import {v4} from "uuid";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Context} from "../../index";
import {Tabs} from 'flowbite-react';
import {CalendarIcon, ClipboardListIcon, EyeIcon} from "@heroicons/react/solid";
import Preloaded from "../../components/atomary/containers/Preloaded";
import {observer} from "mobx-react-lite";
import {DocumentAddIcon, TrashIcon} from "@heroicons/react/outline";
import Text from "../../components/atomary/typography/Text";
import Panel from "../../components/atomary/viewers/Panel";
import Grid from "../../components/atomary/containers/Grid";
import empty from "../../functions/empty";
import DataTable from "../../components/atomary/structers/DataTable";
import ServiceService from "../../services/ServiceService";
import {Toast} from "flowbite-react";
import Collapse from "../../components/atomary/viewers/Collapse";
import Head from "../../components/atomary/typography/Head";
import Subhead from "../../components/atomary/typography/Subhead";
import Select from 'react-select'
import Input from "../../components/atomary/inputs/Input";
import DatePicker from "../../components/atomary/inputs/DatePicker";
import Button from "../../components/atomary/typography/Button";
import dateFormat from "../../functions/date-format";

const Services = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {authStore, appStore, billingStore, notificationsStore} = useContext(Context);

    const [tariffsSelect, setTariffsSelect] = useState();
    const [createTariff, setTariff] = useState('');

    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [startDate, setStartDate] = useState(dateFormat(new Date()));
    const [endDate, setEndDate] = useState(dateFormat(new Date()));

    const switchTab = (name) => {
        document.querySelector(`#${name}_tab`)?.click();
    };
    const removeService = (id) => {
        ServiceService.remove(id).then(response => {
            if (response.status === 200) {
                notificationsStore.success('Service removed');
                appStore.loadRoute();
            } else {
                notificationsStore.success('Service is not removed');
            }
        })
    };
    const addService = () => {
        const data = {
            name: newName,
            tariff: createTariff?.value?.toString()
        };
        if (startDate) {
            data['date'] = new Date(startDate);
        }
        if (endDate) {
            data['date_to'] = new Date(endDate);
        }
        if (newDescription) {
            data['description'] = newDescription;
        }
        ServiceService.add(data).then(response => {
            if (response.status === 200) {
                notificationsStore.success('Service registered');
                appStore.loadRoute();
                setSearchParams({id: response?.data?.data.id || null})
                switchTab('list');
            } else {
                notificationsStore.success('Error happened');
            }
        })
    }

    // State
    const [services, setServices] = useState([]);
    const [serviceColumns, setServiceColumns] = useState([]);

    useEffect(() => {
        const tariff = billingStore.tariffs.filter(tariff => tariff._id === createTariff.value)[0];
        if (!empty(tariff)) {
            setStartDate(dateFormat(new Date()));
            setEndDate(dateFormat(new Date(new Date().setMonth(new Date().getMonth() + Number(tariff.terms)))));
        }
    }, [createTariff])

    useEffect(() => {
        appStore.loadRoute();
        billingStore.getTariffs().then(() => {
            setTimeout(() => {
                setTariffsSelect(billingStore.tariffs.map(tariff => {
                    return {value: tariff._id, label: tariff.name}
                }))
            }, 500)
        });
        billingStore.getServices(0, null).then(() => {
            appStore.makeRouteLoaded();
        });
    }, []);

    useEffect(() => {
        ServiceService.get(0, null).then(response => {
            if (searchParams.get('id')) {
                switchTab('view');
            }
            if (response.status === 200) {
                if (empty(response?.data?.data)) {
                    switchTab('add');
                    notificationsStore.warning('No services', 2);
                    setServices([]);
                }
                setServices(response?.data?.data?.map(service => {
                    return [
                        {text: service.name, meta: {link: true, url: `/services?id=${service._id}`}},
                        {text: service._id},
                        {text: (appStore?.currencies?.filter(item => item?._id === authStore?.user?.config?.currency)[0]?.symbol || '$') + service.price},
                        {text: service.tariff_name},
                        {iconContent: <TrashIcon />, meta: {action: true, fn: () => removeService(service._id)} }
                    ];
                }) || [])
                setServiceColumns(['---', 'Name', 'ID', 'Price', 'Tariff Name', 'Remove'])
            } else {
                notificationsStore.warning('No services', 2);
                setServices([]);
            }
            appStore.makeRouteLoaded();
        })
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
                            title={<span id={"list_tab"}>List</span>}
                            className="tab"
                            icon={ClipboardListIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>{authStore?.user?.customer?.username}'s services</Text>
                                </Panel>

                                {!empty(services) && <DataTable columns={serviceColumns} rows={services} iconStart={<EyeIcon />} />}
                                {empty(services) && <Panel rounded><Text>No services...</Text></Panel>}
                            </Grid>
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span id={"view_tab"}>View</span>}
                            className="tab"
                            icon={EyeIcon}
                            disabled={empty(searchParams.get('id'))}
                        >
                            {!empty(billingStore.services) && billingStore.services.filter(item => item._id === searchParams.get('id')).map(item =>
                                <Grid FULL HA={"start"} VA={"start"} GAP key={v4()}>
                                    <Collapse title={"Info"} opened>
                                        <Grid COL FULL GAP>
                                            <Panel rounded><Head>{item.name}</Head></Panel>
                                            <Toast className="w-full mt-16 max-w-none !p-16 gap-16 flex flex-col !items-start">
                                                <Subhead>Service - "{item.name}"</Subhead>
                                                <Text>From tariff "{item.tariff_name}"</Text>
                                                <Text>{item.description}</Text>
                                                <Subhead>Dear {authStore?.user?.customer?.username || 'Client'}, this service will cost you {item.price}
                                                    {(appStore?.currencies?.filter(item => item?._id === authStore?.user?.config?.currency)[0]?.symbol || '$')} for {item.terms} months</Subhead>
                                                <Panel rounded><span className={"theme_color"}>Service active from {new Date(item.date).toLocaleString()} to {new Date(item.date_to).toLocaleString()}</span></Panel>
                                            </Toast>
                                        </Grid>
                                    </Collapse>
                                </Grid>
                            )}
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span id={"add_tab"}>Add</span>}
                            className="tab"
                            icon={DocumentAddIcon}
                        >
                            <Grid FULL HA={"start"} VA={"start"} GAP={"gap-16"} NOGROW>
                                <Panel rounded><Text>Register service</Text></Panel>
                                <Grid FULL GAP>
                                    <label htmlFor="tariff_select">Select tariff</label>
                                    <Select id={"tariff_select"} onChange={(value) => setTariff(value)} options={tariffsSelect} />
                                </Grid>
                                <Input value={newName} setValue={setNewName} type={"text"} placeholder={"Service Name"} label={"Name"} />
                                <Input value={newDescription} setValue={setNewDescription} type={"text"} placeholder={"About service"} label={"Description"} />
                                <Grid FULL GAP>
                                    Start Date
                                    <DatePicker value={startDate} setValue={setStartDate} label={"Select Start date"} />
                                </Grid>
                                <Grid FULL GAP>
                                    End Date
                                    <DatePicker value={endDate} setValue={setEndDate} label={"Select Start date"} />
                                </Grid>
                                <Grid FULL HA={"center"}>
                                    <Button action={addService}>Add</Button>
                                </Grid>
                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default observer(Services);