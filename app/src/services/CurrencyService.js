import $api from '../http';

export default class CurrencyService {
    static get(from, limit) {
        return $api.get(`/currencies${from ? '/' + from : ''}${limit ? '/' + limit : ''}`);
    }
}