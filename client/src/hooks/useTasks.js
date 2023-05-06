import { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";

export const useTasks = function() {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [dateSelection, setDateSelection] = useState(0);
    const [tasksOptionSelection, setTasksOptionSelection] = useState(0);
    const [sortMethod, setSortMethod] = useState('all tasks');
    const [executorsList, setExecutorsList] = useState([]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetchTaskForUpdate = (task_id) => {
    store.setLoading(true);
    store.getTaskForUpdate(task_id)
    .then ((response) => {
        if (response.message) {
            console.log('ERROR')
        }
        if (response.status === 200) {
            store.setTask(response.data);
        }    
        
    })
    .finally(()=>store.setLoading(false));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const fetchTasks = () => {
        store.setLoading(true);
            store.getTasksForAuthUser(sortMethod)
            .then ((response) => {
                if (response.message) {
                    console.log('ERROR')
                }
                if (response.status === 200) {
                    store.setTasks(response.data);
                }    
                
            })
            .finally(()=>store.setLoading(false));
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const fetchExecutors = () => {
    store.setLoading(true);
        store.getExecutorsForAuthUser()
        .then ((response) => {
            if (response.message) console.log('ERROR');
            if (response.status === 200) setExecutorsList(response.data);
        })
        .finally(()=>store.setLoading(false));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        fetchExecutors();
        if (localStorage.getItem('AccessJwt')) {
            store.setLoading(true);
            store.checkAuthUser()
            .then((response) => {
                if (response.message) {
                    store.setMessage(response.message);
                    store.setAuth(false);
                    store.setLoading(false);
                    navigate('/auth')
                    return
                }
                if (response.status === 200) {
                    localStorage.setItem('AccessJwt', response.data.accessToken);
                    store.setAuth(true);
                    store.setUser(response.data.user);
                    fetchTasks();
                }    
            })
            .finally(()=>store.setLoading(false))
            
        }
        else navigate('/auth');
    },[]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    useEffect(()=> {if (store.isAuth) fetchTasks()} ,[sortMethod]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onClickExitForModal = () => {
        store.setModal(false);
        store.setTask({});
        store.setUpdateTask(false);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onChangeTaskHandler = (task_id) => {
        store.setModal(true);
        store.setUpdateTask(true);
        fetchTaskForUpdate(task_id);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    const onClickNewTask = () => {
        store.setModal(true);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onDeleteTaskHandler = (event, task_id) => {
        event.stopPropagation()
        store.setLoading(true);
        store.deleteTask(task_id)
        .then ((response) => {
            if (response.message) {
                console.log('ERROR')
            }
            if (response.status === 200) {
                fetchTasks();
            }    
            
        })
        .finally(()=>store.setLoading(false));                
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onClickTasksOptionSelectionHandler = (event) => {
        setTasksOptionSelection(event);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onClickDateSelectionHandler = (event)=> {
        setDateSelection(event);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const onLogoutHandler = () => {
        store.setLoading(true);
        store.logoutUser()
        .then((response)=>{
        if (response.message) {
            store.setMessage(response.message);
            store.setAuth(false);
            store.setLoading(false);
            return
        }
        localStorage.removeItem('AccessJwt');
        //Обнуляю все переменные в STORE
        store.setAuth(false);
        store.setUser({});
        store.setUsers([]);
        store.setMessage("");
        navigate('/auth');
    })
        .finally(()=>store.setLoading(false));

    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const onClickCreateNewTask = (titleTask, descriptionTask, date, executor, priority) => {
    store.setLoading(true);
    store.createNewTask(titleTask, descriptionTask, date, executor, priority)
    .then((response)=>{
        if (response.message) {
            store.setMessage(response.message);
            store.setLoading(false);
            return
        }
        if (response.status === 200) {
            store.setModal(false);
            fetchTasks();
        }    
})
    .finally(()=>store.setLoading(false));

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const onClickUpdateTask = (titleTask, descriptionTask, date, executor, priority, status, task_id) => {
    store.setLoading(true);
    store.updateTask(task_id, titleTask, descriptionTask, date, executor, priority, status)
    .then((response)=>{
        if (response.message) {
            store.setMessage(response.message);
            store.setLoading(false);
            return
        }
        if (response.status === 200) {
            store.setModal(false);
            fetchTasks();
        }    
})
    .finally(()=>store.setLoading(false));

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const onClickCheckBoxHandler = (event, task_id) => {
    event.stopPropagation();
    store.setLoading(true);
    store.updateStatusTask(task_id)
    .then((response)=>{
        if (response.message) {
            store.setMessage(response.message);
            store.setLoading(false);
            return
        }
        if (response.status === 200) {
            fetchTasks();
        }    
})
    .finally(()=>store.setLoading(false));

    
}

    return {onLogoutHandler,
            dateSelection,
            onClickDateSelectionHandler,
            tasksOptionSelection,
            onClickTasksOptionSelectionHandler,
            onChangeTaskHandler,
            onDeleteTaskHandler,
            onClickNewTask,
            onClickExitForModal,
            onClickCreateNewTask,
            executorsList,
            onClickUpdateTask,
            onClickCheckBoxHandler,
            setSortMethod};
}
