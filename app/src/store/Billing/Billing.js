import { makeAutoObservable } from "mobx";
import CustomerService from "../../services/CustomerService";
import TariffService from "../../services/TariffService";
import ServiceService from "../../services/ServiceService";
import InvoiceService from "../../services/InvoiceService";
import MessageService from "../../services/MessageService";
import AuthService from "../../services/AuthService";

export default class BillingStore {
    // Fields
    customers = [];
    admins = [];
    services = [];
    invoices = [];
    messages = [];
    tariffs = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Mutations
    setCustomers(list) {
        this.customers = list;
    }
    setServices(list) {
        this.services = list;
    }
    setInvoices(list) {
        this.invoices = list;
    }
    setMessages(list) {
        this.messages = list;
    }
    setTariffs(list) {
        this.tariffs = list;
    }
    // Getters
    tariffsCount() {
        return Number(this?.tariffs?.length) || 0;
    }
    servicesCount() {
        return Number(this?.services?.length) || 0;
    }
    invoicesCount() {
        return Number(this?.invoices?.length) || 0;
    }
    customersCount() {
        return Number(this?.customers?.length) || 0;
    }
    invoicesUnpaid() {
        let total = 0;
        this?.invoices.map(item => {
            if (!item.paid) {
                total += item.price;
            }
        });
        return total;
    }

    // Actions (async)
    async getCustomerInvoices (from, limit) {
        InvoiceService.customerGet(from, limit).then(response => {
            this.setInvoices(response.data);
        })
    }
    async getAdmins() {
        AuthService.getAdmins().then(admins => {
            this.admins = admins.data;
        })
    }
    async getMessages (id) {
        if (!id) {
            return false;
        }
        const response = await MessageService.customerGet(id);
        const messages = [];
        response?.data?.map((message, index) => {
            const author = this.admins.filter(admin => admin.id == message.from);
            messages[index] = message;
            messages[index]['from'] = Array.from(author)[0]?.username;
            messages[index]['from_image'] = Array.from(author)[0]?.image;
        })
        this.setMessages(messages);
        return messages;
    }
    async getInvoices() {
        const response = await InvoiceService.fetch();
        return response?.data || [];
    }
    async getCustomerServices (from, limit) {
        ServiceService.get(from, limit).then(response => {
            this.setServices(response?.data?.data || []);
        })
    }
    async getServices (from, limit) {
        ServiceService.get(from, limit).then(response => {
            this.setServices(response?.data?.data || []);
        })
    }
    async getCustomers (from, limit) {
        let result = [];
        const response = await CustomerService.get(from, limit);
        this.setCustomers(response?.data?.data?.users);
        result = response?.data?.data?.users;
        return result;
    }
    async getTariffs (from, limit) {
        TariffService.get(from, limit).then(response => {
            this.setTariffs(response?.data?.data || []);
        })
    }
}