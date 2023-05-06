import { useMemo, useState, useContext, useEffect } from 'react';
import {Context} from "../index";

export const useModal = function(actionCallback, isUpdate) {
    
    const {store} = useContext(Context);
    const [executor, setExecutor] = useState(1);
    const [priority, setPriority] = useState(1);
    const [status, setStatus] = useState(1);
    const [titleTask, setTitleTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [date, setDate] = useState('');
    
    
    useEffect(()=>{
        if (isUpdate) {
            setTitleTask(store.task.title);
            setDescriptionTask(store.task.description);
            setDate(store.task.close_d);
            setPriority(store.task.priority);
            setStatus(store.task.status);
            setExecutor(store.task.executor);
        }
    },[store.isLoading])
    
    useEffect(()=>setExecutor(store.user.id),[]);

    const onChangeTitle = event => setTitleTask(event.target.value);

    const onSelectPriority = event => setPriority(event);

    const onSelectStatus = event => setStatus(event);

    const onChangeDate = event => setDate(event.target.value);

    const onChangeDescription = event => setDescriptionTask(event.target.value);

    const onSelectExecutor = event => setExecutor(event);
    
    
    const onCreateOrUpdateTask = () => {
        if (titleTask.length > 5 && descriptionTask.length > 5) {
            actionCallback(titleTask, descriptionTask, date, executor, priority, status, store.task?.task_id);
        }
        else {
            store.setError(true);
            setTimeout(()=>store.setError(false), 5000);
            store.setMessage('ОШИБКА!!! Введите значения в заголовок и описание задачи')
        }
    }
    
    useMemo(()=>{
        setDate(new Date().toISOString().substring(0,10));
    },[])



return {onChangeTitle,
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
        date
};
}
