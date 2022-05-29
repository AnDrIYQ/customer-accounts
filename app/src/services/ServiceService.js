import $api from '../http';

export default class ServiceService {
    static get(from, limit) {
        return $api.get(`/services${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
}