import React, {useContext, useEffect, useRef, useState} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from "flowbite-react";
import Grid from "../../components/atomary/containers/Grid";
import {Context} from "../../index";
import { DocumentAddIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Input from "../../components/atomary/inputs/Input";
import Button from "../../components/atomary/typography/Button";
import Collapse from "../../components/atomary/viewers/Collapse";
import {observer} from "mobx-react-lite";
import CurrencyService from "../../services/CurrencyService";
import {AnimationTypes, ComponentTransitionList, Presets} from "react-component-transition";
import Head from "../../components/atomary/typography/Head";
import Icon from "../../components/atomary/typography/Icon";
import {v4} from "uuid";
import {Toast} from "flowbite-react";

const Currency = () => {
    const toEdit = useRef(null);
    const { authStore, appStore, notificationsStore } = useContext(Context);

    const [title, setTitle] = useState('');
    const [symbol, setSymbol] = useState('');

    useEffect(() => {
        appStore.loadRoute();
        appStore.fetchCurrencies().then(() => {
            setTimeout(() => {
                appStore.makeRouteLoaded();
            }, 400);
        })
    }, []);

    const updateCurrency = (id) => {
        let name = document.querySelector(`#id_${id}_name`).value || '';
        let symbol = document.querySelector(`#id_${id}_symbol`).value || '';

        CurrencyService.update(id, {
            name,
            symbol
        }).then((response) => {
            if (response.status === 200) {
                notificationsStore.success(`Валюту ${symbol} змінено`);
                toEdit.current.click();
                appStore.fetchCurrencies();
            } else {
                notificationsStore.error('Валюту не змінено');
            }
        })
    }

    const removeCurrency = (id) => {
        CurrencyService.remove(id).then((response) => {
            if (response.status === 200) {
                notificationsStore.success('Валюту видалено');
                appStore.fetchCurrencies();
            } else {
                notificationsStore.error('Валюту не видалено');
            }
        })
    }

    const createCurrency = () => {
        CurrencyService.create({
            name: title,
            symbol
        }).then((response) => {
            if (response.status === 200) {
                notificationsStore.success(`Валюта ${symbol} змінена`);
                toEdit.current.click();
                appStore.fetchCurrencies();
            } else {
                notificationsStore.error('Валюту не створено');
            }
        })
    };

    return (
        <div className={"tabs customers"}>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.admin &&
                    <Tabs.Group
                        aria-label="Tabs with icons"
                        style="underline"
                    >

                        <Tabs.Item
                            title="Додати"
                            className="tab"
                            icon={DocumentAddIcon}
                        >
                            <Grid GAP={"gap-16"} NOGROW>
                                <Collapse opened title={"Додати нову валюту"}>
                                    <Grid COL FULL GAP={"gap-16"} VA={"end"} NOGROW>
                                        <Input setValue={setTitle} type={"text"} placeholder={"USD"} label={"Назва валюти"} />
                                        <Input setValue={setSymbol} type={"text"} placeholder={"$"} label={"Символ"} maxLength={"1"} />
                                        <Grid FULL HA={"end"}>
                                            <Button action={createCurrency} right>Додати</Button>
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Grid>
                        </Tabs.Item>

                        <Tabs.Item
                            title={<span ref={toEdit}>Дії</span>}
                            className="tab"
                            icon={PencilAltIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW COL VA={"start"} FULL>
                                <Head>Список валют:</Head>
                                <ComponentTransitionList key={v4()} enterAnimation={AnimationTypes.fade.enter} exitAnimation={AnimationTypes.fade.exit}>
                                    {!!appStore.currencies.length && appStore.currencies.slice(0).reverse().map((currency, index) => {
                                            return <Presets.TransitionSlideUp key={currency._id} className={"w-full"}>
                                                <Toast key={currency._id} className="space-x-4 p-16 pr-8 mr-0 flex-nowrap max-w-md divide-x divide-gray-200 dark:divide-gray-700">
                                                    <Grid COL MG GAP customClasses={"grow-0"}>
                                                        <span className={"p-4 theme_color w-32 rounded-full flex items-center justify-center"}>{!!currency.symbol ? currency.symbol : 'C'}</span>
                                                    </Grid>
                                                    <div className="pl-8 text-sm font-normal h-full flex-col justify-start items-start self-end gap-8">
                                                        <span className={"text-lg"}>{currency.name}</span>

                                                        <Input custom spaced type={"text"}
                                                               id={`id_${currency._id}_name`} value={currency.name} placeholder={"USD"} label={"Змінити назву"} />
                                                        <Input custom spaced type={"text"}
                                                               id={`id_${currency._id}_symbol`} value={currency.symbol} placeholder={"$"} label={"Змінити символ"} maxLength={"1"} />

                                                        <Grid FULL GAP HA={"end"} VA={"center"}>
                                                            <div className={"rounded px-4 py-12 gap-4 flex justify-between items-center"}>
                                                                <Button action={() => updateCurrency(currency._id)} right>Змінити</Button>
                                                                <div className={"grow-0"} onClick={() => removeCurrency(currency._id)}><Icon><TrashIcon /></Icon></div>
                                                            </div>
                                                        </Grid>
                                                    </div>
                                                </Toast>
                                            </Presets.TransitionSlideUp>
                                        })
                                    }
                                </ComponentTransitionList>
                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default observer(Currency);