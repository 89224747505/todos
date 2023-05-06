const UserService = require('../service/userService');
const ApiError = require('../exeptions/apiError')
const pool = require('../db.js')

class UserController {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async registration(req, res, next) {
        try {

            //Дастаем данные из тела запроса
            const {name, soname, patronymic, login, password, manager_id} = req.body;
            
            //Регистрируем нового пользователя с помощью сервиса регистарции пользователей
            const result = await UserService.registration(name, soname, patronymic, login, password, manager_id)

            //Отправляем данные на сервер со статусом 200 и данными полученными из сервиса
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async login(req, res, next) {
        try {
            //Дастаем данные из тела запроса
            const {login, password} = req.body;
            
            //Обращаемся к юзер-сервису функции login для логинизации нашего пользователя
            const userData = await UserService.login(login, password);

            //Если userData равно 0, то это означает, что произошла непредвиденная ошибка в UserService
            if (userData === 0) return res.status(500).json({status: 0, message: 'Непредвиденная ошибка сервера'});

            //Помещаем refreshToken в cookie и задаем ему параметры жизни 30 дней и флаг,
            //который не позволяет изменять куку на стороне клиента с помощью JS
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})

            //Отправляем данные на сервер со статусом 200 и данными полученными из сервиса
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async logout(req, res, next) {
        try {
            //Достаем refreshToken из cookies и помещаем его в одноименную переменную
            const {refreshToken} = req.cookies;
            
            //Если refreshToken пустой, то отправляем ошибку
            if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));

            //Вызываем сервисуную фунцкию логаута из юзер сервиса и передаем в нее этот рефреш токен
            const result = await UserService.logout(refreshToken, req.user);
            
            if (result === 1) {
                //Удаляем куку refreshToken
                res.clearCookie('refreshToken');
                        
                //Отправляем ответ на
                return res.status(200).json({"message": "Пользователь вышел из профиля", resultCode: 0});
            } else
            return res.status(400).json({"message": "Ошибка сервера", resultCode: 1});
        } catch (e) {
            next(e);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async refresh(req, res, next) {
        try {
            //Достаем refreshToken из cookies и помещаем его в одноименную переменную
            const {refreshToken} = req.cookies;

            //Если refreshToken пустой, то отправляем ошибку
            if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));

            //Обращаемся к юзер-сервису функции refresh для одновления нашего токена
            const userData = await UserService.refresh(refreshToken);

            //Помещаем refreshToken в cookie и задаем ему параметры жизни 30 дней и флаг,
            //который не позволяет изменять куку на стороне клиента с помощью JS
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})

            //Отправляем данные на сервер со статусом 200 и данными полученными из сервиса
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }   

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getUsers(req, res, next) {    
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getExecutors(req, res, next) {    
    try {
        const users = await UserService.getExecutors(req.user.id);
        return res.status(200).json(users);
    } catch (e) {
        next(e);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

module.exports = new UserController();