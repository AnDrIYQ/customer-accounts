import $api from '../http';

export default class InvoiceService {
    static customerGet(from, limit) {
        return $api.get(`/customer-invoices${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
    static fetch() {
        return $api.get('/invoices')
    }
    static async charge(description, customer) {
        return await $api.post(`/invoices/charge/${customer}`, {description});
    }
    static async read(id) {
        return await $api.put(`/invoice-was-read/${id}`);
    }
    static pay(id) {
        return $api.put(`/invoice-paid/${id}`);
    }
}