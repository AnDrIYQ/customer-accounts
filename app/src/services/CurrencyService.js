import $api from '../http';

export default class CurrencyService {
    static get(from, limit) {
        return $api.get(`/currencies${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
    static create(data) {
        return $api.post(`/currencies/add`, data);
    }
    static remove(id) {
        return $api.delete(`/currencies/delete/${id}`);
    }
    static update(id, data) {
        return $api.put(`/currencies/${id}/update`, data);
    }
}