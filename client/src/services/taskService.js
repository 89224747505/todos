import $api from '../http';

export default class TaskService {

    static async fetchTasksForAuthUser(sortMethod) { return $api.post('/gettasks',{sortMethod}) }

    static async fetchTaskForUpdate(task_id) { return $api.post('/gettask',{task_id}) }
    
    static async deleteTask(task_id) { return $api.post('/deletetask',{task_id}) }

    static async createNewTask(title, description, date, executor, priority) { return $api.post('/createtask',{title, description, date, executor, priority}) }

    static async updateTask(task_id, title, description, date, executor, priority, status) { return $api.post('/update',{task_id, title, description, date, executor, priority, status}) }

    static async updateStatusTask(task_id) { return $api.post('/updatestatus',{task_id}) }
}