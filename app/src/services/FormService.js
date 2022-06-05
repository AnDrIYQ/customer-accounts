import $api from '../http';

export default class FormService {
    static configUpdate(data) {
        try {
            return $api.put('/configs/update', data);
        } catch (e) {
            return e;
        }
    }
    static updateUser(data) {
        try {
            return $api.put('/customers/update', data);
        } catch (e) {
            return e;
        }
    }
    static updateAdmin(data) {
        try {
            return $api.put('/admins/update', data);
        } catch (e) {
            return e;
        }
    }
    static removeCustomer() {
        try {
            return $api.delete('/customers/delete');
        } catch (e) {
            return e;
        }
    }
}