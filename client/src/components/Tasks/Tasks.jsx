import React, { useEffect, useContext } from 'react';
import styles from './Tasks.module.css';

import Loading from '../UI/Loading/Loading';
import TaskList from '../TaskList/TaskList';
import TaskMenu from '../TaskMenu/TaskMenu';
import MyModal from '../MyModal/MyModal';

import {Context} from "../../index";
import { observer } from 'mobx-react-lite';
import { useTasks } from '../../hooks/useTasks';

const Tasks = () => {
    const {store} = useContext(Context);
    const {onLogoutHandler,
           dateSelection,
           onClickDateSelectionHandler,
           tasksOptionSelection,
           onClickTasksOptionSelectionHandler,
           onChangeTaskHandler,
           onDeleteTaskHandler,
           onClickNewTask,
           onClickExitForModal,
           onClickCreateNewTask,
           onClickUpdateTask,
           executorsList,
           onClickCheckBoxHandler,
           setSortMethod} = useTasks();
    return (
        <div className={styles.wrapper}>
        {store.isModal && !store.isUpdate ? 
            <MyModal 
                titleModal="Создать задачу"
                executorsList={[{name: '*'+store.user.soname + ' ' + store.user.name + ' ' + store.user.patronymic, value:store.user.id}, ...executorsList]}
                isUpdate={store.isUpdate}
                actionCallback={onClickCreateNewTask}
                exitCallback={onClickExitForModal} /> : null}

        {store.isModal && store.isUpdate ? 
            <MyModal 
                titleModal="Редактировать задачу"
                executorsList={[{name: '*'+store.user.soname + ' ' + store.user.name + ' ' + store.user.patronymic, value:store.user.id}, ...executorsList]}
                isUpdate={store.isUpdate}
                actionCallback={onClickUpdateTask}
                exitCallback={onClickExitForModal} /> : null}

        {store.isLoading ? <Loading className={styles.loading}/> : null}
        <div className={styles.taskForm}>
            <TaskMenu 
                dateSelection={dateSelection}
                onClickDateSelectionHandler={onClickDateSelectionHandler}
                tasksOptionSelection={tasksOptionSelection}
                onClickTasksOptionSelectionHandler={onClickTasksOptionSelectionHandler}
                setSortMethod={setSortMethod}
            />
            <div onClick={onClickNewTask} className={styles.addTask}>+ новая задача</div>
            {store.tasks.length === 0 ? <div className={styles.emptyTasks}>Нет доступных задач...</div> : null}            
            <TaskList 
                tasks={store.tasks}
                openCallback={onChangeTaskHandler}
                deleteCallback={onDeleteTaskHandler}
                checkBoxCallback={onClickCheckBoxHandler}
                />
            
            {store.error ? <div className={styles.errorMessage}>{store.message}</div> : null}   
            <div className={styles.exitButton} onClick={onLogoutHandler}>x</div>
        </div>
        </div>
    );
};

export default observer(Tasks);