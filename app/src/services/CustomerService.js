import $api from '../http';

export default class CustomerService {
    static get(from, limit) {
        return $api.get(`/customers${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
}