import React, {useContext, useEffect, useState} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from "flowbite-react";
import Grid from "../../components/atomary/containers/Grid";
import {Context} from "../../index";
import {UsersIcon} from "@heroicons/react/outline";
import DatePicker from "../../components/atomary/inputs/DatePicker";

const Tariff = () => {
    const {authStore, appStore, billingStore} = useContext(Context);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {

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
                            title="List"
                            className="tab"
                            icon={UsersIcon}
                        >
                            <Grid GAP={"gap-8"} NOGROW>
                                Charge Data
                                <DatePicker />
                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default Tariff;