import $api from '../http';

export default class ServiceService {
    static get(from, limit) {
        return $api.get(`/services${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
    static add(data) {
        return $api.post(`/services/add`, data);
    }
    static remove(id) {
        return $api.delete(`/services/remove/${id}`);
    }
}