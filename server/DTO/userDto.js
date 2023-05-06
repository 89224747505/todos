module.exports = class UserDto {
    id;
    name;
    soname;
    patronymic;
    login;
    manager_id;
    manager;

    constructor(model) {
        this.id = model.user_id
        this.name = model.name;
        this.soname = model.soname;
        this.patronymic = model.patronymic;
        this.login = model.login;
        this.manager_id = model.manager_id;
        this.manager = model.manager;
    }
}
