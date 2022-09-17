import React, {useContext, useEffect, useRef, useState} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from "flowbite-react";
import { PencilAltIcon } from "@heroicons/react/solid";
import {Context} from "../../index";
import Grid from "../../components/atomary/containers/Grid";
import Text from "../../components/atomary/typography/Text";
import Collapse from "../../components/atomary/viewers/Collapse";
import Input from "../../components/atomary/inputs/Input";
import Button from "../../components/atomary/typography/Button";
import Textarea from "../../components/atomary/inputs/Textarea";
import Checkbox from "../../components/atomary/inputs/Checkbox";
import SelectField from "../../components/atomary/inputs/SelectField";
import FormService from "../../services/FormService";
import File from "../../components/atomary/inputs/File";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Config = () => {
    const {authStore, appStore, notificationsStore } = useContext(Context);
    const navigate = useNavigate();

    // Refs
    const fileField = useRef(null);
    // State
    const [themeColor, setThemeColor] = useState(authStore?.user?.config?.theme_color?.toString() || "#ffffff");
    const [currencyId, setCurrencyId] = useState(authStore?.user?.config?.currency?.toString() || "");
    const [showNotifications, setShowNotifications] = useState(!!authStore?.user?.config?.notifications);

    const [username, setUsername] = useState(authStore?.user?.admin?.username || authStore?.user?.customer?.username || "");
    const [bio, setBio] = useState(authStore?.user?.admin?.bio || authStore?.user?.customer?.bio || "");
    const [password, setPassword] = useState(null);
    const [accountId] = useState(authStore?.user?.admin?.id || authStore?.user?.customer?.id || 'Немає');
    const [email] = useState(authStore?.user?.user?.email || '0');

    const [sureRemove, setSureRemove] = useState(false);

    const [currenciesVariants, setCurrenciesVariants] = useState([]);

    useEffect(() => {
        appStore.loadRoute();
        appStore.fetchConfig().then(() => {
            appStore.makeRouteLoaded();
            const list = [];
            appStore.currencies.map(curr => {
                list.push({value: curr._id, text: curr.symbol});
            })
            setCurrenciesVariants(list);
        });
    }, []);

    const configHandler = () => {
        const data = new FormData();
        Object.values(fileField.current.files).forEach(file => {
            data.append("image", file);
        });
        data.append('theme_color', themeColor);
        data.append('notifications', showNotifications.toString());
        data.append('currency', currencyId);

        appStore.loadRoute();
        FormService.configUpdate(data).then(r => {
            if (r?.status === 200) {
                notificationsStore.success("Налаштування змінено")
                setTimeout(() => {
                    appStore.setConfig(r.data.data);
                    appStore.updateColor(r.data.data.theme_color);
                    appStore.makeRouteLoaded();
                }, 700)
            }
        });
    };

    const accountHandler = () => {
        let action = "";
        if (authStore?.user?.admin?.username) {
            action = "updateAdmin"
        } else {
            action = "updateUser"
        }
        let data = { username };
        if (bio) {
            data["bio"] = bio;
        }
        if (password) {
            data["password"] = password;
        }

        appStore.loadRoute();
        FormService[action].apply(this, [data]).then(response => {
            if (response.status === 200) {
                notificationsStore.success("Обліковий запис змінено");
            }
            setTimeout(() => {
                appStore.makeRouteLoaded();
            }, 700);
        })
    }

    const removeAccount = () => {
        FormService.removeCustomer().then((response) => {
            if (response.status === 200) {
                authStore.logout().then(r => {
                    notificationsStore.warning("Клієнта видалено, бувайте");
                    navigate('/register');
                });
            }
        })
    }

    return (
        <div className={"tabs"}>
            <Preloaded loading={appStore.routeLoading}>
                <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline"
                >
                    <Tabs.Item className="tab"
                               title="Редагувати"
                               icon={PencilAltIcon}
                    >
                        <Grid GAP={"gap-8"} COL FULL VA={"start"} HA="center" NOGROW>
                            <Text align={"center"}>Тут ви можете змінити налаштування</Text>
                            <Grid FULL GAP VA={"start"} HA={"center"} NOGROW>
                                <Collapse opened title={"Система"}>
                                    <File id={"image"} label={"Змінити зображення"} innerRef={fileField} setValue={() => {}} />
                                    <Input right type={"color"} value={themeColor} label={"Колір теми"} setValue={setThemeColor} />
                                    {authStore?.user?.customer &&
                                    <SelectField id={"currency"} label={"Вибрати валюту"} init={currencyId} setValue={setCurrencyId} variants={Array.from(currenciesVariants)}  />}
                                    {authStore?.user?.customer &&
                                        <Checkbox label={"Показувати сповіщення?"} checked={!!showNotifications} setValue={setShowNotifications} />}
                                    <Grid FULL HA={"end"}>
                                        <Button action={configHandler} right>Зберегти</Button>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid FULL VA={"start"} HA={"center"} NOGROW>
                                <Collapse opened title={"Обліковий запис"}>
                                    <Input right type={"email"} value={email} label={"Email"} disabled />
                                    <Input right type={"text"} value={username} placeholder={"Ваше ім'я"} label={"Змінити ім'я"} setValue={setUsername} />
                                    <Textarea right type={"text"} value={bio} placeholder={"Інформація"} label={"Про себе"} setValue={setBio} />
                                    {authStore?.user?.customer &&
                                        <Input right type={"password"} value={password} placeholder={"Змініть якщо хочете"} setValue={setPassword} label={"Пароль"} />}
                                    <Grid FULL HA={"end"}>
                                        <Button action={accountHandler} right>Зберегти</Button>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            {authStore?.user?.customer && <Grid FULL VA={"start"} HA={"center"} NOGROW>
                                <Collapse title={"Небезпечно!"}>
                                    <Grid FULL HA={"start"} GAP>
                                        <Input disabled type={"text"} value={accountId} label={"Ідентифікатор облікового запису"} />
                                        {sureRemove && <Text>Ви впевнені?</Text>}
                                        {!sureRemove ? <button onClick={() => setSureRemove(true)} className={"rounded-sm !bg-red-500 hover:!bg-red-500 focus:!bg-red-500 active:!bg-red-500"}>Видалити обліковий запис</button> :
                                            <Grid FULL HA={"start"} GAP>
                                                <button className={"!bg-red-500 hover:!bg-red-500 focus:!bg-red-500 rounded-sm active:!bg-red-500"} onClick={removeAccount}>Так</button>
                                                <button className={"theme_color rounded-sm"} onClick={() => setSureRemove(false)}>Ні</button>
                                            </Grid>
                                        }
                                    </Grid>
                                </Collapse>
                            </Grid>}
                        </Grid>
                    </Tabs.Item>
                </Tabs.Group>
            </Preloaded>
        </div>
    );
};

export default observer(Config);