import React from 'react';
import styles from './TaskMenu.module.css';
import { useTaskMenu } from '../../hooks/useTaskMenu';
import { observer } from 'mobx-react-lite';

const TaskMenu = ({dateSelection, tasksOptionSelection, onClickDateSelectionHandler, onClickTasksOptionSelectionHandler, setSortMethod}) => {
    
    const {onClickAllTasks,
           onClickDateTasks,
           onClickResponsiblityExecutor,
           onClickToday,
           onClickWeek,
           onClickFuture} = useTaskMenu(onClickTasksOptionSelectionHandler, onClickDateSelectionHandler, dateSelection, setSortMethod); 

    return (
        <>
            <div className={styles.taskFormTopMenu}>
                <div onClick={onClickAllTasks} className={tasksOptionSelection === 0 ? [styles.taskChk, styles.checkedTopMenu].join(' ') : styles.taskChk}>Все задачи</div>
                <div onClick={onClickDateTasks} className={tasksOptionSelection === 1 ? [styles.taskChk, styles.checkedTopMenu].join(' ') : styles.taskChk}>По дате</div>
                <div onClick={onClickResponsiblityExecutor} className={tasksOptionSelection === 2 ? [styles.taskChk, styles.checkedTopMenu].join(' ') : styles.taskChk}>По ответственным</div>
                
            </div>
            { tasksOptionSelection === 1 
            ?<div className={styles.taskDateSelection}>  
                <div onClick={onClickToday} className={dateSelection === 0 ? styles.checkedDateMenu : null}>на сегодня</div>
                <div onClick={onClickWeek} className={dateSelection === 1 ? styles.checkedDateMenu : null}>на неделю</div>
                <div onClick={onClickFuture} className={dateSelection === 2 ? styles.checkedDateMenu : null}>на будущее</div>
             </div>
            : null
            }
        </>
    );
};

export default observer(TaskMenu);