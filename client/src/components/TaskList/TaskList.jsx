import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import { observer } from 'mobx-react-lite';

const TaskList = ({tasks, openCallback, deleteCallback, checkBoxCallback}) => {
    return (
        <div className={styles.wrapper}>
            {tasks.map((item)=>
                <div key={item.task_id} className={styles.container}>
                <TaskItem
                    task_id={item.task_id}
                    title={item.title}
                    responsibleExecutor={item.responsible_executor}
                    priority={item.priority}
                    status={item.status}
                    closeDate={item.close_d}
                    creator_id={item.creator_id}
                    openTaskCallback={()=>openCallback(item.task_id)}
                    deleteTaskCallback={deleteCallback}
                    checkBoxCallback={(event)=>checkBoxCallback(event, item.task_id)}
                />   
                </div>         
            )}
        </div>
    );
};

export default observer(TaskList);