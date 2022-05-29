import React, {useContext, useRef} from 'react';
import Preloaded from "../../components/atomary/containers/Preloaded";
import {Tabs} from "flowbite-react";
import {EyeIcon, PencilAltIcon, TrashIcon} from "@heroicons/react/solid";
import {DocumentAddIcon} from "@heroicons/react/outline";
import {Context} from "../../index";

const Config = () => {
    // const fileField = useRef(null);
    const {authStore, appStore} = useContext(Context);

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
                    <Tabs.Item title="View"
                               className="tab"
                               icon={EyeIcon}
                    >
                        Content
                    </Tabs.Item>
                    <Tabs.Item className="tab"
                               title="Edit"
                               icon={PencilAltIcon}
                    >
                        Dashboard content
                    </Tabs.Item>
                    <Tabs.Item title="Delete"
                               className="tab"
                               icon={TrashIcon}
                    >
                        Settings content
                    </Tabs.Item>
                    <Tabs.Item title="Invoice"
                               className="tab"
                               icon={DocumentAddIcon}
                    >
                        Invoice content
                    </Tabs.Item>
                </Tabs.Group>
            </Preloaded>
        </div>
    );
};

export default Config;