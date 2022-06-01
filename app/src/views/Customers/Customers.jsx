import React, {useContext, useEffect} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from "flowbite-react";
import Grid from "../../components/atomary/containers/Grid";
import {Context} from "../../index";
import {UsersIcon} from "@heroicons/react/outline";

const Customers = () => {
    const {authStore, appStore, billingStore} = useContext(Context);

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

                            </Grid>
                        </Tabs.Item>

                    </Tabs.Group>}
            </Preloaded>
        </div>
    );
};

export default Customers;