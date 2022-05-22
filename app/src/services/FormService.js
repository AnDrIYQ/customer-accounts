import $api from '../http';

export default class FormService {
    static send(action, data) {
        try {
            return $api.post(action, data);
        } catch (e) {
            return e;
        }
    }
}