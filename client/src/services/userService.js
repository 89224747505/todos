import $api from '../http';

export default class UserService {

    static async fetchUsers() {return $api.get('/users')}

    static async fetchExecutorsForAuthUser() {return $api.get('/executors')}
}