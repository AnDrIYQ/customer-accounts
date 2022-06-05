import $api from '../http';

export default class MessageService {
    static customerGet(id) {
        return $api.get(`/messages-customer${id ? '/' + id : ''}`);
    }
    static write(data) {
        return $api.post('/messages/write', data);
    }
}