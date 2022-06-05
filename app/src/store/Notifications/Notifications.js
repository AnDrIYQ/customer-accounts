import { makeAutoObservable } from "mobx";
import {v4} from "uuid";

export default class NotificationsStore {
    // Fields
    notificationsEnabled = true;
    notifications = [
        // {id: Mixed,
        // link: String,
        // content: String,
        // type: One of -> {'error', 'success', 'warning', default: 'info'},
        // time: Number (seconds)},
    ];
    constructor() {
        makeAutoObservable(this);
        this.timer();
    }
    // Mutators
    timer() {
        this.notifications.map((notification) => {
            if (notification.time) {
                setTimeout(() => {
                    this.deleteNotification(notification.id)
                }, notification.time * 1000)
            }
        })
    }
    setNotifications(status) {
        this.notificationsEnabled = !!status;
    }
    pushNotification(data) {
        this.notifications.push(data);
        this.timer();
    }
    deleteNotification(id) {
        this.notifications = this.notifications.filter(item => item.id !== id);
    }
    // Actions
    message(text) {
        this.notify({ id: v4(), content: text, time: 5 });
    }
    adminMessage(text) {
        this.notify({ id: v4(), content: text, time: 5, link: '/messages' });
    }
    success(text) {
        this.notify({ id: v4(), content: text, time: 5, type: 'success' });
    }
    warning(text, seconds) {
        this.notify({ id: v4(), content: text, type: 'warning', time: !!seconds ? seconds : 5 });
    }
    serverError(data) {
        this.notify({ id: v4(), content: data.message, time: 5, type: 'warning' });
    }
    error(text) {
        this.notify({ id: v4(), content: text, time: 5, type: 'error' });
    }
    validationError(data) {
        let text = '';
        if (data?.message) {
            text = data.message + '. <br/>';
        }
        if (!data) {
            return false;
        }
        if (data?.errors?.length) {
            data.errors.map(error => {
                text += error.msg.charAt(0).toUpperCase() + error.msg.slice(1) + ': ' + error.param.charAt(0).toUpperCase() + error.param.slice(1) + '<br/>'
            })
        }
        this.notify({ id: new Date().toString(), content: text, time: 5, type: 'error' });
    }
    notify(data) {
        this.pushNotification(data);
    }
}