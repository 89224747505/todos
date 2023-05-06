import React, { useContext } from 'react';
import styles from './TaskItem.module.css';
import highPriority from '../../images/priorityhigh.png';
import mediumPriority from '../../images/prioritymedium.png';
import lowPriority from '../../images/prioritylow.png';
import infinity from '../../images/beskonech.png';
import check from '../../images/check.png';
import trash from '../../images/trash.png';
import inProgress from '../../images/progress.png';
import {convertDate, compareDate} from '../../utils/utils';
import {Context} from "../../index";
import { observer } from 'mobx-react-lite';

const TaskItem = ({task_id, title, responsibleExecutor, priority, status, closeDate, creator_id, openTaskCallback, deleteTaskCallback, checkBoxCallback}) => {
    const {store} = useContext(Context);
    return (
        <div onClick={creator_id === store.user.id ? openTaskCallback : null} className={creator_id === store.user.id ? styles.wrapper : styles.wrapperDisable}>
            <div className={styles.leftContainer}>
                <div className={status === "done" ? [styles.title,styles.green].join(' ') :
                                    status === "cancel" ? [styles.title,styles.blue].join(' ') :         
                                         !compareDate(closeDate) ? [styles.title,styles.red].join(' ') : 
                                            styles.title}>
                    {title.length > 28 ? title.substring(0, 28)+"..." : title}
                </div>
                <div className={styles.responsibleExecutor}>Ответственный:{responsibleExecutor}</div>
            </div>
            <div className={styles.centerContainer}>
                <div className={styles.centerContainer__top}>
                    <div className={styles.priority}>
                        <img src={priority === 'high' ? highPriority 
                                    : priority === 'medium' ? mediumPriority : lowPriority}/>
                    </div>
                    <div className={styles.closeDate}>{convertDate(closeDate)}</div>
                </div>
                <div className={styles.status}>{status === "for execution" ? "ожидает выполнения":
                                                status === "in progress" ? "выполняется":
                                                status === "done" ? "выполнено": "отменено"}</div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.checkbox} onClick={checkBoxCallback}>
                    <img src={status === "for execution" ? infinity:
                                status === "in progress" ? inProgress:
                                    status === "done" ? check : null} />
                </div>
                <div className={styles.trash}>
                    {creator_id === store.user.id 
                        ?<img onClick={event=>deleteTaskCallback(event, task_id)} src={trash} />
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(TaskItem);
