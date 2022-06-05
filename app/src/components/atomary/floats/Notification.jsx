import React, {useContext, useEffect, useState} from 'react';
import Grid from "../containers/Grid";
import Icon from "../typography/Icon";
import Text from "../typography/Text";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    MinusCircleIcon,
    XIcon
} from "@heroicons/react/outline";

const Notification = ({ content, id, type, link, ...rootAttributes }) => {
    const [typeColor, setTypeColor] = useState('theme');
    const [typeIcon, setTypeIcon] = useState(<InformationCircleIcon />);
    const { notificationsStore } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        switch(type) {
            case 'error': setTypeColor('red'); setTypeIcon(<MinusCircleIcon />); break;
            case 'success': setTypeColor('green'); setTypeIcon(<CheckCircleIcon />); break;
            case 'warning': setTypeColor('orange'); setTypeIcon(<ExclamationCircleIcon />); break;
            default: setTypeColor('theme'); setTypeIcon(<InformationCircleIcon />); break;
        }
    }, [typeColor, ])

    const clickHandler = (e) => {
        if (e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
            if (link) {
                navigate(link);
            }
            notificationsStore.deleteNotification(id);
        } else {
            notificationsStore.deleteNotification(id);
        }
    };

    return (

        <div className="card w-full toaster shadow-md bg-white cursor-pointer p-16 rounded-md" {...rootAttributes} onClick={clickHandler}>
            <Grid NOGROW GAP={"gap-12"} WRAP="no">
                <Icon color={typeColor}>{ typeIcon }</Icon>
                <Grid NOGROW GAP HA="space" FULL VA="center" WRAP="no">
                    <Text>{content}</Text>
                    <span className="ml-8"><Icon mini><XIcon /></Icon></span>
                </Grid>
            </Grid>
        </div>
    );
};

export default Notification;