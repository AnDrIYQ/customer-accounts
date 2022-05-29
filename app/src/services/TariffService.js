import $api from '../http';

export default class TariffService {
    static get(from, limit) {
        return $api.get(`/tariffs${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
}