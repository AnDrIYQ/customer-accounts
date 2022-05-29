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

const Config = () => {
    // Refs
    const fileField = useRef(null);
    const {authStore, appStore } = useContext(Context);
    const [currenciesVariants, setCurrenciesVariants] = useState([]);

    useEffect(() => {
        appStore.loadRoute();
        appStore.fetchConfig().then(() => {
            appStore.makeRouteLoaded();
            const list = [];
            appStore.currencies.map(curr => {
                list.push({value: curr.symbol, text: curr.name});
            })
            setCurrenciesVariants(list);
        });
    });

    // const uploadFile = () => {
    //     const data = new FormData();
    //     Object.values(fileField.current.files).forEach(file => {
    //         data.append("images", file);
    //     });
    //     data.append('name', 'Hello')
    //     FormService.send('/users', data).then(r => {
    //         return null;
    //     });
    // };

    return (
        <div className={"tabs"}>
            <Preloaded loading={appStore.routeLoading}>
                <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline"
                >
                    <Tabs.Item className="tab"
                               title="Edit"
                               icon={PencilAltIcon}
                    >
                        <Grid GAP={"gap-8"} COL FULL VA={"start"} HA="center" NOGROW>
                            <Text align={"center"}>You can change your settings here</Text>
                            <Grid FULL GAP VA={"start"} HA={"center"} NOGROW>
                                <Collapse opened title={"System"}>
                                    <Input right type={"file"} placeholder={"Image"} required label={"Change Image"} />
                                    <Input right type={"color"} required label={"Theme color"} />
                                    <SelectField id={"currency"} required label={"Select currency"} variants={Array.from(currenciesVariants)} />
                                    <Checkbox label={"Show notifications?"} />
                                    <Grid FULL HA={"end"}>
                                        <Button right>Save</Button>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid FULL VA={"start"} HA={"center"} NOGROW>
                                <Collapse opened title={"Account"}>
                                    <Input right type={"text"} placeholder={"Your name"} required label={"Change Name"} />
                                    <Textarea right type={"text"} placeholder={"About you"} required label={"Change Biography"} />
                                    <Input right type={"password"} placeholder={"Change if you want"} required label={"Change password"} />
                                    <Grid FULL HA={"end"}>
                                        <Button right>Save</Button>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid FULL VA={"start"} HA={"center"} NOGROW>
                                <Collapse title={"Danger!"}>
                                    <Grid FULL HA={"end"}>
                                        <button className={"!bg-red-500 hover:!bg-red-500 focus:!bg-red-500 active:!bg-red-500"}>Remove account</button>
                                    </Grid>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </Tabs.Item>
                </Tabs.Group>
            </Preloaded>
        </div>
    );
};

export default Config;