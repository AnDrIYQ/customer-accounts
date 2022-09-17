import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {EyeIcon, CalendarIcon} from "@heroicons/react/solid";
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from 'flowbite-react'
import Grid from "../../components/atomary/containers/Grid";
import {Avatar} from "@material-ui/core";
import {v4} from "uuid";
import Image from "../../components/atomary/typography/Image";
import {Toast} from "flowbite-react";
import {AnimationTypes, ComponentTransitionList, Presets} from "react-component-transition";
import Icon from "../../components/atomary/typography/Icon";

const Messages = () => {
    const { appStore, authStore, billingStore } = useContext(Context);

    useEffect(() => {
        appStore.loadRoute();
        billingStore.getMessages(authStore?.user?.customer?.id);
        setTimeout(() => {
            appStore.makeRouteLoaded();
        }, 500);
    }, [])

    return (
        <div className={"tabs"}>
            <Preloaded loading={appStore.routeLoading}>
                {authStore?.user?.customer &&
                    <Tabs.Group
                    aria-label="Tabs with icons"
                    style="underline">

                    <Tabs.Item title="Список"
                               className="tab"
                               icon={EyeIcon}
                    >
                        <Grid GAP={"gap-8"} NOGROW COL VA={"start"} FULL>
                            <ComponentTransitionList key={v4()} enterAnimation={AnimationTypes.fade.enter} exitAnimation={AnimationTypes.fade.exit}>
                            {!!billingStore.messages.length && billingStore.messages.slice(0).reverse().map(message => {
                                return <Presets.TransitionFade key={message._id} className={"w-full"}>
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
                                    </Toast>
                                </Presets.TransitionFade>
                            })}
                            </ComponentTransitionList>
                            {!billingStore.messages.length &&
                                <Toast className="space-x-4 p-16 mr-0 flex-nowrap max-w-xl divide-x divide-gray-200 dark:divide-gray-700">
                                    <Grid COL MG GAP customClasses={"grow-0"}>
                                        <Image><Avatar /></Image>
                                        <span className={"text-lg text-center"}>System</span>
                                    </Grid>
                                    <div className="pl-8 text-sm font-normal h-full flex-col justify-start items-start self-end gap-8">
                                        <span className={"text-lg"} style={{minHeight: '64px'}}>Немає повідомлень...</span>
                                        <Grid FULL GAP HA={"end"} VA={"center"}>
                                            <div className={"rounded px-4 py-12 gap-4 flex items-center"}>
                                                <Icon mini><CalendarIcon /></Icon>
                                                <span>{new Date().toLocaleString()}</span>
                                            </div>
                                        </Grid>
                                    </div>
                                </Toast>
                            }
                        </Grid>
                    </Tabs.Item>

                </Tabs.Group>}
             </Preloaded>
        </div>
    );
};

export default observer(Messages);