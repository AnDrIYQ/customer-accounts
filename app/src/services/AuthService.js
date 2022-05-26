import $api from '../http';

export default class AuthService {
    static login(email, password) {
        return $api.post('/login', {email, password});
    }
    static register(email, password, username, bio) {
        return $api.post('/register', {email, password, username, bio});
    }
    static logout(email, password) {
        return $api.post('/logout');
    }
}