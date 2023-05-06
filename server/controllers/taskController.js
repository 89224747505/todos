const TaskService = require("../service/taskService");

class TaskController {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async getTasksForAuthUser(req, res, next) {
    try {
        //Достаем refreshToken из cookies и помещаем его в одноименную переменную
        const {refreshToken} = req.cookies;

        //Дастаем данные из тела запроса
        const {sortMethod} = req.body;
        
        //Если refreshToken пустой, то отправляем ошибку
        if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));            

        const tasks = await TaskService.getTasksForAuthUser(req.user.id, sortMethod);
        return res.status(200).json(tasks);
    } catch (e) {
        next(e);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async deleteTask(req, res, next) {
    try {
        //Достаем refreshToken из cookies и помещаем его в одноименную переменную
        const {refreshToken} = req.cookies;

        //Дастаем данные из тела запроса
        const {task_id} = req.body;
        
        //Если refreshToken пустой, то отправляем ошибку
        if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));            

        const result = await TaskService.deleteTask(req.user.id, task_id);
        if (result === -1) return next(ApiError.BadRequest("Нельзя удалять не свои задачи", {resultCode: 1}));
        if (result === 1) return res.status(200).json({message:"Задача удалена"});
    } catch (e) {
        next(e);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async createTask(req, res, next) {
    try {
        //Достаем refreshToken из cookies и помещаем его в одноименную переменную
        const {refreshToken} = req.cookies;

        //Дастаем данные из тела запроса
        const {title, description, date, executor, priority} = req.body;
        
        //Если refreshToken пустой, то отправляем ошибку
        if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));            
        console.log(req.user);
        
        const result = await TaskService.createTask(req.user.id, title, description, date, executor, priority);
        if (result === 0) return next(ApiError.BadRequest("Ошибка создания новой задачи", {resultCode: 1}));
        if (result === 1) return res.status(200).json({message:"Задача создана"});
    } catch (e) {
        next(e);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async getTask(req, res, next) {
    try {
        //Достаем refreshToken из cookies и помещаем его в одноименную переменную
        const {refreshToken} = req.cookies;

        //Дастаем данные из тела запроса
        const {task_id} = req.body;
        
        //Если refreshToken пустой, то отправляем ошибку
        if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));            

        const task = await TaskService.getTask(req.user.id, task_id);
        return res.status(200).json(task);
    } catch (e) {
        console.log(e);
        next(e);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async updateTask(req, res, next) {
    try {
        //Достаем refreshToken из cookies и помещаем его в одноименную переменную
        const {refreshToken} = req.cookies;

        //Дастаем данные из тела запроса
        const {task_id, title, description, date, executor, priority, status} = req.body;
        
        //Если refreshToken пустой, то отправляем ошибку
        if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));            

        const result = await TaskService.updateTask(req.user.id, task_id, title, description, date, executor, priority, Number(status));
        
        if (result === 1) return res.status(200).json(result);
        if (result === 0) return next(ApiError.BadRequest("Ошибка обновления задачи", {resultCode: 1}));
    } catch (e) {
        console.log(e);
        next(e);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async updateStatus(req, res, next) {
    try {
        //Достаем refreshToken из cookies и помещаем его в одноименную переменную
        const {refreshToken} = req.cookies;

        //Дастаем данные из тела запроса
        const {task_id} = req.body;
        
        //Если refreshToken пустой, то отправляем ошибку
        if (!refreshToken) return next(ApiError.BadRequest("Нет залогиненного пользователя на клиенте", {resultCode: 1}));            

        const result = await TaskService.updateStatus(req.user.id, task_id);
        
        if (result === 1) return res.status(200).json(result);
        if (result === 0) return next(ApiError.BadRequest("Ошибка обновления задачи", {resultCode: 1}));
    } catch (e) {
        console.log(e);
        next(e);
    }
}
}

module.exports = new TaskController();