import React, {useContext} from 'react';
import {AnimationTypes, ComponentTransition, ComponentTransitionList, Presets} from "react-component-transition";
import Notification from "../atomary/floats/Notification";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Notifications = (props) => {
    const { notificationsStore } = useContext(Context);

    return (
        <div className="fixed notifications-block top-0 right-0 flex-col m-32 gap-16">
            <ComponentTransitionList enterAnimation={AnimationTypes.fade.enter} exitAnimation={AnimationTypes.fade.exit} >
                {notificationsStore.notifications.map(notification =>
                    <Presets.TransitionFade key={notification.link}>
                        <Notification key={notification.link}
                                      link={notification?.link}
                                      content={notification?.content}
                                      icon={notification?.icon}
                                      onClick={() => notificationsStore.deleteNotification(notification.link)}
                        />
                    </Presets.TransitionFade>)
                }
            </ComponentTransitionList>
        </div>
    );
};

export default observer(Notifications);