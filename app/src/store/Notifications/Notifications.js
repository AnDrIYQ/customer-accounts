import { makeAutoObservable } from "mobx";
import notification from "../../components/atomary/floats/Notification";

export default class NotificationsStore {
    // Fields
    notifications = [
        {link: 'Link 1', content: 'Content', icon: 'Icon'},
        {link: 'Link 2', content: 'Content', icon: 'Icon'},
        {link: 'Link 3', content: 'Content', icon: 'Icon'},
        {link: 'Link 4', content: 'Content', icon: 'Icon'}
    ]

    constructor() {
        makeAutoObservable(this);
    }

    // Mutators
    pushNotification(data) {}
    deleteNotification(id) {
        this.notifications = this.notifications.filter(item => item.link !== id);
    }
    // clearNotifications() {}

    // Actions
    // notify(data) {}
}