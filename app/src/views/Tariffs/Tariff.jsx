import React, {useContext, useEffect, useState} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from "flowbite-react";
import Grid from "../../components/atomary/containers/Grid";
import {Context} from "../../index";
import {DocumentAddIcon, TrashIcon} from "@heroicons/react/outline";
import {ClipboardListIcon, EyeIcon, PencilAltIcon} from "@heroicons/react/solid";
import Panel from "../../components/atomary/viewers/Panel";
import Text from "../../components/atomary/typography/Text";
import {observer} from "mobx-react-lite";
import DataTable from "../../components/atomary/structers/DataTable";
import TariffService from "../../services/TariffService";
import {useNavigate, useSearchParams} from "react-router-dom";
import empty from "../../functions/empty";
import Collapse from "../../components/atomary/viewers/Collapse";
import Input from "../../components/atomary/inputs/Input";
import Button from "../../components/atomary/typography/Button";
import Textarea from "../../components/atomary/inputs/Textarea";
import {v4} from "uuid";

const Tariff = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {authStore, appStore, billingStore, notificationsStore} = useContext(Context);

    const [isEditForm] = useState(!empty(searchParams.get('id')));

    const [tariffColumns, setTariffColumns] = useState([]);
    const [tariffsList, setTariffsList] = useState([]);

    const [removeList, setRemoveList] = useState([]);

    const [tariffName, setTariffName] = useState('');
    const [tariffDescription, setTariffDescription] = useState('');
    const [tariffTerms, setTariffTerms] = useState('');
    const [tariffPrice, setTariffPrice] = useState('0');

    const [name, setName] = useState(billingStore?.tariffs?.filter(item => item._id === searchParams.get('id'))[0]?.name || '');
    const [description, setDescription] = useState(billingStore?.tariffs?.filter(item => item._id === searchParams.get('id'))[0]?.description || '');
    const [terms, setTerms] = useState(billingStore?.tariffs?.filter(item => item._id === searchParams.get('id'))[0]?.terms || '');
    const [price, setPrice] = useState(billingStore?.tariffs?.filter(item => item._id === searchParams.get('id'))[0]?.price || '0');

    const [newTariffFields, setNewTariffFields] = useState([{key: '', value: ''},]);
    const [editFields, setEditTariffFields] = useState(billingStore?.tariffs?.filter(item => item._id === searchParams.get('id'))[0]?.fields || []);

    const setEditValue = (e, field) => {
        let value = e.target.value;
        setEditTariffFields(old => {
            return old.map(i => i.title === field.title ? {
                ...i,
                value,
            } : i);
        })
    };
    const setEditKey = (e, field) => {
        let key = e.target.value;
        setEditTariffFields(old => {
            return old.map(i => i.value === field.value ? {
                ...i,
                title: key,
            } : i);
        })
    };
    const removeEditField = (key) => {
        setEditTariffFields(old => {
            return old.filter(item => item.title !== key);
        })
    };
    const addEditField = (data) => {
        setEditTariffFields([
            ...editFields,
            data
        ])
    };

    const setNewValue = (e, field) => {
        let value = e.target.value;
        setNewTariffFields(old => {
            return old.map(i => i.key === field.key ? {
                ...i,
                value
            } : i);
        })
    };
    const setNewKey = (e, field) => {
        let key = e.target.value;
        setNewTariffFields(old => {
            return old.map(i => i.value === field.value ? {
                ...i,
                key
            } : i);
        })
    };
    const removeField = (key) => {
        setNewTariffFields(old => {
            return old.filter(item => item.key !== key);
        })
    };
    const addField = (data) => {
        setNewTariffFields([
            ...newTariffFields,
            data
        ])
    };

    const parseFields = (fields) => {
        return Object.values(fields).map(field => {
            return `${field.title}: ${field.value}; `;
        });
    }

    const tryCreateTariff = () => {
        newTariffFields.map(field => {
            if (empty(field.key) || empty(field.value)) {
                notificationsStore.error("Поле створено не правильно");
            }
        })

        const fields = newTariffFields.map(field => {
            field["title"] = field.key;
            field["type"] = "String";
            return field;
        })
        const data = {
            name: tariffName,
            price: Number(tariffPrice),
            terms: Number(tariffTerms),
        };
        if (!empty(fields)) {
            data['fields'] = fields;
        }
        if (!empty(tariffDescription)) {
            data['description'] = tariffDescription;
        }

        appStore.loadRoute();
        TariffService.create(data).then(response => {
            if (response?.status === 200) {
                notificationsStore.success("Тариф успішно створено");
                billingStore.getTariffs(0, null);
                appStore.makeRouteLoaded();
                setTimeout(() => {
                    navigate('/tariffs' + `${response?.data?.data?.id ? '?id=' + response.data.data.id : ''}`);
                }, 500)
            } else {
                appStore.makeRouteLoaded();
                notificationsStore.error("Помилка під час створення");
            }
        })
    }
    const tryUpdateTariff = () => {
        editFields.map(field => {
            if (empty(field.title) || empty(field.value)) {
                notificationsStore.error("Поле змінено не правильно");
            }
        })
        const fields = editFields.map(field => {
            field["title"] = field.title;
            field["type"] = "String";
            return field;
        })
        const data = {
            name: name,
            price: Number(price),
            terms: Number(terms),
        };
        if (!empty(fields)) {
            data['fields'] = fields;
        }
        if (!empty(description)) {
            data['description'] = description;
        }

        appStore.loadRoute();
        TariffService.update(data).then(response => {
            if (response?.status === 200) {
                notificationsStore.success("Тариф оновлено");
                billingStore.getTariffs(0, null);
                appStore.makeRouteLoaded();
                setTimeout(() => {
                    navigate('/tariffs');
                }, 500)
            } else {
                appStore.makeRouteLoaded();
                notificationsStore.error("Помилка під час оновлення");
            }
        })
    }

    const removeTariff = (id) => {
        TariffService.delete(id).then(() => {
            Promise.all([
                billingStore.getTariffs(0, '')
            ]).then(() => {
                setTimeout(() => {
                    updateTariffsList(billingStore.tariffs);
                    updateRemoveList(billingStore.tariffs);
                    setSearchParams([]);
                }, 1500)
                notificationsStore.success("Тариф та його сервіси видалено");
            })
        })
    };

    const switchTab = (name) => {
        document.querySelector('#' + name + '_tab')?.click();
    };

    const updateRemoveList = (list) => {
        let removeArray = [];
        list?.map(tariff => {
            const values = Object.values(tariff).map((value) => {
                if (typeof value === 'object') {
                    return {text: parseFields(value)};
                }
                return {text: value.toString(), meta: {action: true, fn: () => removeTariff(tariff._id)}};
            }).slice(1, 6);
            removeArray.push(values);
        })
        setRemoveList(removeArray);
    }

    const updateTariffsList = (list) => {
        let array = [];
        list.map(tariff => {
            const values = Object.values(tariff).map((value, index) => {
                if (Object.keys(tariff)[index] === 'name') {
                    return {text: value.toString(), meta: {link: true, url: `/tariffs?id=${tariff._id}`}};
                }
                if (typeof value === 'object') {
                    return {text: parseFields(value)};
                }
                return {text: value.toString()};
            }).slice(1, 6);
            array.push(values);
        })
        setTariffsList(array);
    }

    // Form Table (View)
    useEffect(() => {
        if (searchParams.get('remove')) {
            switchTab('remove');
        }
        if (searchParams.get('list')) {
            switchTab('list');
        }
        if (searchParams.get('add')) {
            switchTab('add');
        }

        appStore.loadRoute();
        Promise.all([
            billingStore.getTariffs(0, '')
        ]).then(() => {
            if (empty(billingStore.tariffs)) {
                appStore.makeRouteLoaded();
                return false;
            }
            setTariffColumns([
                '--',
                ...TariffService.columns(Object.keys(billingStore.tariffs[0])),
            ]);
            updateTariffsList(billingStore.tariffs);
            updateRemoveList(billingStore.tariffs);
            setTimeout(() => {
                appStore.makeRouteLoaded();
            }, 400);
        });
    }, []);

    return (
        <div className={"tabs customers"}>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.admin &&
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
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>Тарифи в системі</Text>
                                </Panel>
                                {!empty(tariffsList) && <DataTable columns={tariffColumns} rows={tariffsList} iconStart={<EyeIcon />} />}
                                {empty(tariffsList) && <Panel rounded><Text>Немає тарифів...</Text></Panel>}
                            </Grid>
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span id={"add_tab"}>Створити</span>}
                            className="tab"
                            icon={DocumentAddIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>Створити новий</Text>
                                </Panel>

                                <Grid GAP={"gap-16"} customClasses={"grow-1 items-stretch"} FULL COL>
                                    <Collapse opened title={"Головна інформація"} className={"w-full"}>
                                        <Grid COL GAP={"gap-16"} VA={"end"} FULL>
                                            <Input value={tariffName} setValue={setTariffName} type={"text"} placeholder={"Назвіть тариф"} label={"Назва тарифу"} />
                                            <Textarea value={tariffDescription} setValue={setTariffDescription} type={"text"} placeholder={"Опишіть тариф"} label={"Опис"} />
                                            <Input value={tariffPrice} setValue={setTariffPrice} type={"number"} placeholder={"У валюті клієнта"} label={"Ціна"} />
                                            <Input value={tariffTerms} setValue={setTariffTerms} type={"number"} placeholder={"В місяцях"} label={"Термін"} />
                                            <Grid FULL HA={"end"}>
                                                <Button action={tryCreateTariff} right>Створити</Button>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                    <Collapse opened title={"Поля тарифу"} className={"w-full"}>
                                        <Grid COL GAP={"gap-16"} VA={"end"} FULL>
                                            {!empty(newTariffFields) && newTariffFields.map(field => {
                                                return <div key={v4()} className={"flex gap-16 w-full items-center justify-end"}>
                                                    <Grid>
                                                        <Input withEvent ungapped value={field.key} onTouch={val => setNewKey(val, field)} custom setValue={()=>{}} type={"text"} placeholder={"Назва поля"} />
                                                    </Grid>
                                                    <Grid HALF>
                                                        <Input withEvent ungapped value={field.value} onTouch={val => setNewValue(val, field)} custom setValue={()=>{}} type={"text"} placeholder={"Значення"} />
                                                    </Grid>
                                                    <Grid>
                                                        <Button unwidth action={() => removeField(field.key)}>-</Button>
                                                    </Grid>
                                                </div>
                                            })}

                                            <Grid FULL HA={"center"}>
                                                <Button action={() => addField({key: '', value: ''})}>+</Button>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </Grid>

                            </Grid>
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span id={"edit_tab"}>Редагувати</span>}
                            className="tab"
                            active={isEditForm}
                            icon={PencilAltIcon}
                            disabled={empty(isEditForm)}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center"} style={{width: "100%"}}>Змінити тариф</Text>
                                </Panel>

                                <Grid GAP={"gap-16"} customClasses={"grow-1 items-stretch"} FULL COL>
                                    <Collapse opened title={"Змінити інформацію"} className={"w-full"}>
                                        <Grid COL GAP={"gap-16"} VA={"end"} FULL>
                                            <Input value={name} setValue={setName} type={"text"} placeholder={"Назва"} disabled label={"Назва тарифу"} />
                                            <Textarea value={description} setValue={setDescription} type={"text"} placeholder={"Про тариф"} label={"Опис"} />
                                            <Input value={price} setValue={setPrice} type={"number"} placeholder={"У валюті клієнта"} label={"Ціна"} />
                                            <Input value={terms} setValue={setTerms} type={"number"} placeholder={"У місяцях"} label={"Термін"} />
                                            <Grid FULL HA={"end"}>
                                                <Button action={tryUpdateTariff} right>Оновити</Button>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                    <Collapse opened title={"Змінити поля"} className={"w-full"}>
                                        <Grid COL GAP={"gap-16"} VA={"end"} FULL>
                                            {!empty(editFields) && editFields?.map(field => {
                                                return <div key={v4()} className={"flex gap-16 w-full items-center justify-end"}>
                                                    <Grid>
                                                        <Input withEvent ungapped value={field.title} onTouch={val => setEditKey(val, field)} custom setValue={()=>{}} type={"text"} placeholder={"Назва поля"} />
                                                    </Grid>
                                                    <Grid HALF>
                                                        <Input withEvent ungapped value={field.value} onTouch={val => setEditValue(val, field)} custom setValue={()=>{}} type={"text"} placeholder={"Значення"} />
                                                    </Grid>
                                                    <Grid>
                                                        <Button unwidth action={() => removeEditField(field.title)}>-</Button>
                                                    </Grid>
                                                </div>
                                            })}

                                            <Grid FULL HA={"center"}>
                                                <Button action={() => addEditField({key: '', value: ''})}>+</Button>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </Grid>

                            </Grid>
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span id={"remove_tab"}>Видалити</span>}
                            className="tab"
                            icon={TrashIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL FULL VA={"start"}>
                                <Panel rounded>
                                    <Text customClasses={"justify-center item-center"} style={{width: "100%"}}>Видалити тарифи</Text>
                                </Panel>

                                {empty(removeList) && <Panel rounded><Text>Немає тарифів...</Text></Panel>}
                                {!empty(removeList) && <DataTable rows={removeList} iconEnd={<TrashIcon />} headless />}
                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default observer(Tariff);