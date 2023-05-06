import React, { useContext } from 'react';
import styles from './MyModal.module.css';
import MySelect from '../UI/MySelect/MySelect';
import MyButton from '../UI/MyButton/MyButton';
import { observer } from 'mobx-react-lite';
import { useModal } from '../../hooks/useModal';
import {Context} from "../../index";


const MyModal = ({titleModal, executorsList, isUpdate, exitCallback, actionCallback}) => {
    
    const {store} = useContext(Context);

    const {onChangeTitle,
           onSelectPriority,
           onSelectStatus,
           onChangeDate,
           onChangeDescription,
           onSelectExecutor,
           onCreateOrUpdateTask,
           executor,
           priority,
           status,
           titleTask,
           descriptionTask,
           date} = useModal(actionCallback, isUpdate);

    return (
        <div className={styles.modalContainter} onClick={exitCallback}>
            <div className={styles.modalForm} onClick={(e)=>e.stopPropagation()}>
                {store.error ? <div className={styles.errorMessage}>{store.message}</div> : null}
                <div className={styles.exitButton} onClick={exitCallback}>x</div>
                <div className={styles.titleForm}>{titleModal}</div>
                <div className={styles.containerTitleDescription}>
                    <div className={styles.containerTitle}>
                        <div>Заголовок</div>
                        <input 
                            type="text"
                            placeholder="Введите заголовок новой задачи..."
                            value={titleTask}
                            onChange={onChangeTitle}
                        />
                    </div>
                    <div className={styles.containerDescription}>
                        <div>Описание</div>
                        <textarea 
                            placeholder="Добавьте развернутое описание задачи..."
                            value={descriptionTask}
                            onChange={onChangeDescription}
                        />
                    </div>
                </div>
                <div className={styles.containerRequisites}>
                    <div className={styles.contarinerRequisites__left}>
                        <div className={styles.containerCloseDate}>
                            <div>Дата окончания</div>
                            <input 
                                type="date"
                                value={date}
                                onChange={onChangeDate}
                                />
                        </div>
                        <div className={styles.containerExecutor}>
                            <div>Ответственный</div>
                            <MySelect
                                className={styles.select} 
                                options={executorsList}
                                isDefaultValue={false}
                                value={executor}
                                onChange={onSelectExecutor}
                            />   
                        </div>
                    </div>
                    <div className={styles.contarinerRequisites__right}>
                        <div className={styles.containerPriority}>
                            <div>Приоритет</div>
                            <MySelect
                                className={[styles.select, styles.selectRight].join(' ')} 
                                options={[
                                    {name:'высокий', value: 1},
                                    {name:'средний', value: 2},
                                    {name:'низкий', value: 3}
                                ]}
                                isDefaultValue={false}
                                value={priority}
                                onChange={onSelectPriority}
                            />   
                        </div>

                        <div className={styles.containerStatus}>
                            <div>Статус задачи</div>
                            { isUpdate ?
                                <MySelect
                                    className={[styles.select, styles.selectRight].join(' ')} 
                                    options={[
                                        {name:'к выполнению', value: 1},
                                        {name:'выполняется', value: 2},
                                        {name:'выполнен', value: 3},
                                        {name:'отменен', value: 4}
                                    ]}
                                    isDefaultValue={false}
                                    value={status}
                                    onChange={onSelectStatus}
                                />   
                            : <div className={styles.textStatus}>к выполнению</div>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.buttonCreate}>
                    <MyButton callback={onCreateOrUpdateTask}>{titleModal}</MyButton>
                </div>
            </div>
        </div>
    );
}; 

export default observer(MyModal);