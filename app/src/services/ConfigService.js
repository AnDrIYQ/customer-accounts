import $api from '../http';

export default class ConfigService {
    static async getData(from, limit) {
        return $api.get(`/customers${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
}