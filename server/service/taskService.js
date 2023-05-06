const ApiError = require('../exeptions/apiError');
const pool = require('../db.js');


class TaskService {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getTasksForAuthUser (userId, method) {
        
        let queryString = "SELECT task_id, title, close_d, priority_name AS priority, status_name AS status, u1.user_id AS creator_id, " +
                          "CONCAT(u2.soname, ' ', u2.name,' ', u2.patronymic) AS responsible_executor " +
                          "FROM tasks " +                                     
                          "JOIN status USING(status_id) " +
                          "JOIN priority USING(priority_id) " +
                          "JOIN users AS u1 ON u1.user_id = user_creator_id " +
                          "JOIN users AS u2 ON u2.user_id = user_owner_id ";

        const sorted =  method === "all tasks" ? "WHERE u1.user_id = $1 OR u2.user_id = $1 ORDER BY close_d ASC, title ASC": 
                        method === "today" ? "WHERE (u1.user_id = $1 OR u2.user_id = $1) AND close_d = NOW()::date ORDER BY priority ASC" : 
                        method === "week" ? "WHERE (u1.user_id = $1 OR u2.user_id = $1) AND (close_d BETWEEN NOW()::date AND (NOW()::date + '7 day'::interval)) ORDER BY close_d ASC" :
                        method === "future" ? "WHERE (u1.user_id = $1 OR u2.user_id = $1) AND close_d >= (NOW()::date + '7 day'::interval) ORDER BY close_d ASC" :
                        method === "executor" ? "WHERE u1.user_id = $1 AND u2.user_id <> $1 ORDER BY u2.user_id ASC, close_d ASC" :
                        "";
                
        const tasks = await pool.query(queryString + sorted, [userId]);        
        
        return tasks.rows;
    }    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async deleteTask (user_id, task_id) {
        
    const tasks = await pool.query("SELECT task_id, user_creator_id FROM tasks WHERE task_id = $1", [task_id]);

    if (tasks.rows[0].user_creator_id === user_id) {
        const result = await pool.query("DELETE FROM tasks WHERE task_id = $1", [task_id]);
        return result.rowCount;
    } 
    else 
        return -1;
}    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async createTask(user_id, title, description, date, executor, priority) {

    const result = await pool.query("INSERT INTO tasks (title, description, create_d, close_d, priority_id, status_id, user_creator_id, user_owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                                 [title, description,new Date().toISOString().substring(0,10), date, priority, 1, user_id, executor]);
    return result.rowCount;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async getTask (user_id, task_id) {
    
    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }    
            
    const tasks = await pool.query("SELECT task_id, title, description, close_d, priority_id as priority, status_id as status, user_owner_id as executor "+
                                    "FROM tasks WHERE user_creator_id = $1 AND task_id = $2", [user_id, task_id]);        
    
    
    let date = new Date(tasks.rows[0].close_d);
    
    
    return {...tasks.rows[0], close_d: date.addDays(1).toISOString().substring(0,10)}
}    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async updateTask(user_id, task_id, title, description, date, executor, priority, status) {
    
    const result = await pool.query("UPDATE tasks SET (title, description, close_d, update_d, user_owner_id, priority_id, status_id) = " +
    "($1, $2, $3, NOW()::date, $4, $5, $6) WHERE user_creator_id = $7 AND task_id = $8", [title, description, date, executor, priority, status, user_id, task_id]);        
    
    return result.rowCount;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async updateStatus(user_id, task_id) {
    
    console.log(task_id);

    let result = await pool.query("SELECT task_id, status_id FROM tasks WHERE task_id = $1 AND (user_creator_id = $2 OR user_owner_id = $2)", [task_id, user_id]);
    
    console.log(result.rows[0]);

    let status = result.rows[0].status_id;

    switch(status) {
        case 1: 
            status = 2;
            break;
        case 2:
            status = 3;
            break;
        case 3:
            status = 1;
            break;
        default:
            status = 4;
    }
    
    console.log({status, user_id, task_id});
    
    result = await pool.query("UPDATE tasks SET status_id = $1 WHERE task_id = $2", [status, task_id]);

    return result.rowCount;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
module.exports = new TaskService();