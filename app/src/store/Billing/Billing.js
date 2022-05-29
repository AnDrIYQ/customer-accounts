import { makeAutoObservable } from "mobx";
import CustomerService from "../../services/CustomerService";
import TariffService from "../../services/TariffService";

export default class BillingStore {
    // Fields
    customers = [];
    services = [];
    invoices = [];
    messages = [];
    tariffs = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Mutations
    setCustomers(list) {}
    setServices(list) {}
    setInvoices(list) {}
    setMessages(list) {}
    setTariffs(list) {}
    // Getters
    tariffsCount() {
        return Number(this?.tariffs?.length) || 0;
    }
    customersCount() {
        return Number(this?.customers?.length) || 0;
    }

    // Actions (async)
    async getCustomers (from, limit) {
        CustomerService.get(from, limit).then(response => {
            this.customers = response.data.data.users;
        })
    }
    async getTariffs (from, limit) {
        TariffService.get(from, limit).then(response => {
            this.tariffs = response.data.data;
        })
    }
}