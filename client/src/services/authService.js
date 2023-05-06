import $api from '../http';

export default class AuthService {

    static async login(login, password) { return $api.post('/login', {login, password}) }

    static async registration(login, password, soname, name, patronymic, manager_id) { return $api.post('/registration', {login, password, soname, name, patronymic, manager_id}) }

    static async logout() { return $api.post('/logout') }

    static async checkAuth() {return $api.get('/refresh')}

}