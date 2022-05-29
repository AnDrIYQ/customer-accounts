import $api from '../http';

export default class MessageService {
    static customerGet(id) {
        return $api.get(`/messages-customer${id ? '/' + id : ''}`);
    }
}