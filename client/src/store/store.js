import {makeAutoObservable} from "mobx";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import TaskService from "../services/taskService";

export default class Store {
    isAuth = false;             //Авторизация пользователя
    isLoading = false;          //Процесс загрузки
    isModal = false;            //Модальное окно
    
    login = '';                 //Логин в форме авторизации и регистрации
    password = '';              //Пароль в форме авторизации и регистрации
    soname = '';                //Фамилия в форме авторизации и регистрации
    name = '';                  //Имя в форме авторизации и регистрации
    patronymic = '';            //Отчество в форме авторизации и регистрации
    
    loginError = false;         //Ошибка валидации в форме логин
    passwordError = false;      //Ощибка валидации в форме пароль
    sonameError = false;        //Ощибка валидации в форме фамилия
    nameError = false;          //Ощибка валидации в форме имя
    patronymicError = false;    //Ощибка валидации в форме отчество


    user = {};
    users = [];
    tasks = [];
    task = {};


    message = '';
    error = false;
    isUpdate = false;

    constructor() {
        makeAutoObservable(this);
    }

    //СЕТТЕРЫ//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setLogin(login) {this.login = login}
    setPassword(password) {this.password = password}
    setSoname(soname) {this.soname = soname}
    setName(name) {this.name = name}
    setPatronymic(patronymic) {this.patronymic = patronymic}
    setUserInformationClear() {
        this.setName('');
        this.setSoname('');
        this.setPatronymic('');
        this.setLogin('');
        this.setPassword('');
        this.setMessage('');
        this.setLoading(false);
    }


    setSonameError(bool) {this.sonameError = bool}
    setNameError(bool) {this.nameError = bool}
    setPatronymicError(bool) {this.patronymicError = bool}
    setLoginError(bool) {this.loginError = bool}
    setPasswordError(bool) {this.passwordError = bool}


    setAuth(bool) {this.isAuth = bool}
    setUser(user) {this.user = user}
    setLoading(bool) {this.isLoading = bool}
    setUsers(users) {this.users = users}
    setMessage(message) {this.message = message}
    setError(bool) {this.error = bool}

    setTask(task) {this.task = task}
    setUpdateTask(bool) {this.isUpdate = bool}
    setTasks(tasks) {this.tasks = tasks}
    setModal(bool) {this.isModal = bool}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async loginUser(login, password) {
        try {
            return AuthService.login(login, password);
        } catch (e) {
            console.log("Ошибка логинизации", e);
        }
    }

    async registrationUser(login, password, soname, name, patronymic, manager_id) {
        try {
            return AuthService.registration(login, password, soname, name, patronymic, manager_id);
        } catch (e) {
            console.log("Ошибка регистрации", e);
        }
    }

    async logoutUser() {
        try {
            return AuthService.logout();
        } catch (e) {
            console.log("Ошибка выхода из аккаунта", e);
        } 
        
    }

    async checkAuthUser() {
        try {
            return AuthService.checkAuth();
        } catch (e) {
            console.log("Ошибка поддтверждения авторизации", e);
        }
    }
    

    async getUsers() {
        try {
            return UserService.fetchUsers();
        } catch (e) {
            console.log("Ошибка получения всех пользователей:", e);
        }
    }


    async getTasksForAuthUser(sortMethod) {
        try {
            return TaskService.fetchTasksForAuthUser(sortMethod);
        }catch(e) {
            console.log("Ошибка получения задач:", e);
        }
    }

    async getTaskForUpdate(task_id) {
        try {
            return TaskService.fetchTaskForUpdate(task_id);
        }catch(e) {
            console.log("Ошибка получения задачи:", e);
        }

    }

    async getExecutorsForAuthUser() {
        try {
            return UserService.fetchExecutorsForAuthUser();
        }catch(e) {
            console.log("Ошибка получения пользователей:", e);
        }

    }

    async deleteTask(task_id) {
        try {
            return TaskService.deleteTask(task_id);
        }catch(e) {
            console.log("Ошибка получения задач:", e);
        }
    }

    async createNewTask(titleTask, descriptionTask, date, executor, priority) {
        try {
            return TaskService.createNewTask(titleTask, descriptionTask, date, executor, priority);
        }catch(e) {
            console.log("Ошибка создания новой задачи:", e);
        }
    }

    async updateTask(task_id, titleTask, descriptionTask, date, executor, priority, status) {
        try {
            return TaskService.updateTask(task_id, titleTask, descriptionTask, date, executor, priority, status);
        }catch(e) {
            console.log("Ошибка создания новой задачи:", e);
        }
    }

    async updateStatusTask(task_id) {
        try {
            return TaskService.updateStatusTask(task_id);
        }catch(e) {
            console.log("Ошибка создания новой задачи:", e);
        }

    }
}