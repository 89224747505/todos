const bcrypt = require('bcrypt');
const TokenService = require('../service/tokenService');
const UserDto = require('../DTO/userDto');
const ApiError = require('../exeptions/apiError');
const pool = require('../db.js');


class UserService {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async registration (name, soname, patronymic, login, password, manager_id) {

        if (login.length < 6 || password.length < 6) throw ApiError.BadRequest(`Количество символов в пароле или логине меньше 6`);

        //Ищем пользователя в БД с таким же логином
        const candidate = await pool.query("SELECT login FROM users WHERE login=$1",
        [login]);

        //Если найден пользователь с таким логином, то выдать ошибку регистрации на данный логин
        if (candidate.rows[0]) throw ApiError.BadRequest(`Пользователь ${login} уже существует`);

        //Хэшируем переданный нам пароль для записи в БД закодированного пароля
        const hashPassword = await bcrypt.hash(password, 3);

        //Создаем нового пользователя
        const user = await pool.query("INSERT INTO users (name, soname, patronymic, login, password, manager_id) VALUES ($1, $2, $3, $4, $5, $6)",
            [name, soname, patronymic, login, hashPassword, manager_id]);

        return {result: user.rowCount}
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async login(login, password) {

        //Ищем пользователя в БД с таким же логином
        const user = await pool.query("SELECT u1.user_id, u1.name, u1.soname, u1.patronymic, u1.login, u1.password, u1.manager_id, CONCAT(u2.name, ' ', u2.soname) AS manager FROM users AS u1 JOIN users AS u2 ON u1.manager_id = u2.user_id WHERE u1.login=$1",
                    [login]);

        //Если не найден пользователь с таким логином, то выдать ошибку регистрации на данный логин
        if (!user.rows[0]) throw ApiError.BadRequest(`Пользователь ${login} не найден`);

        //Хэшируем переданный нам пароль и сравниваем его с паролем из БД
        const isComparePasswords = await bcrypt.compare(password, user.rows[0].password);

        //Если пароли не равны, то посылаем ошибку
        if (!isComparePasswords) throw ApiError.BadRequest(`Указан неверный пароль пользователя`);

        //Создаем DTO и выбираем нужные нам поля в объекте для более удобной работы
        const userDto = new UserDto(user.rows[0]);

        //Генерируем новые ACCESS и REFRESH токены
        const tokens = TokenService.generateTokens({...userDto})

        //Обновляем у пользователя в БД значение refreshToken
        
        await pool.query("UPDATE users SET refreshtoken = $1 WHERE user_id = $2",
        [tokens.refreshToken, userDto.id]);
        
        return {user: userDto, ...tokens}
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async logout(refreshToken, user) {
        //Обновляем у пользователя в БД значение refreshToken присваиваем ему значение null 
        const result = await pool.query("UPDATE users SET refreshtoken = NULL WHERE refreshToken = $1 AND user_id = $2",
                       [refreshToken, user.id]);
       
       return result.rowCount;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async refresh(refreshToken) {
        //Проверяем если refreshToken отсутствует, то ошибка нет авторизации
        if (!refreshToken) throw ApiError.UnauthorizedError();

        //Проверяем валидность refreshToken
        const userData = TokenService.validateRefreshToken(refreshToken);

        //Находим в БД пользователя с refreshToken
        const userFromDB = await TokenService.findToken(refreshToken);

        //Проверяем условие, что и валидация и поиск в БД успешны, если нет, то ошибка авторизации
        if (!userData || !userFromDB) throw ApiError.UnauthorizedError();

        //Создаем DTO и выбираем нужные нам поля в объекте для более удобной работы
        const userDto = new UserDto(userFromDB);

        //Генерируем новые ACCESS и REFRESH токены
        const tokens = TokenService.generateTokens({...userDto})

        //Обновляем у пользователя в БД значение refreshToken
        
        const result = await pool.query("UPDATE users SET refreshtoken = $1 WHERE user_id = $2",
        [tokens.refreshToken, userDto.id]);

        if (result.rowCount === 0) throw ApiError.Internal("Ошибка сервера", {resultCode : 1});

        return {...tokens,user: userDto}
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getAllUsers() {
        const result = await pool.query("SELECT user_id as value, CONCAT(u1.soname,' ',u1.name, ' ',u1.patronymic) as name FROM users as u1 ORDER BY user_id ASC");
        return {users:result.rows}
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getExecutors(user_id) {
        const result = await pool.query("SELECT CONCAT(soname, ' ', name,' ', patronymic) AS name, user_id AS value FROM users WHERE manager_id = $1 AND manager_id <> user_id", [user_id]);
        return result.rows
    }
}

module.exports = new UserService();