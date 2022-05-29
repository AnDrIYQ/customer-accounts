import $api from '../http';

export default class InvoiceService {
    static customerGet(from, limit) {
        return $api.get(`/customer-invoices${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
}