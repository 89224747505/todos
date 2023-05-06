import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";

export const useRegistration = function() {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [managerId, setManagerId] = useState(1)

    useEffect(()=>{
        store.setLoading(true);
        store.getUsers()
        .then((response) => {
            if (response.message) {
                store.setMessage(response.message);
                navigate('/auth')
                return
            }
            if (response.status === 200) {
                store.setUsers(response.data.users);                
            }    
        })
        .finally(()=>store.setLoading(false))
    }, []);

    const onChangeSelect = (event) => {
        setManagerId(event);
    }

    const onClickAuthtorization = () => {
        navigate('/auth');
    }

    const onClickEnterHandler = () => {
        
        const regName = /^[А-Яа-я]{3,40}$/;
        const regLog = /^[A-Za-z0-9]{4,40}$/;
        const regPass = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),./:;'\|{} "]).*$/;

        if (regPass.test(store.password) &&
            regLog.test(store.login) &&
            regName.test(store.soname) &&
            regName.test(store.name) &&
            regName.test(store.patronymic)
           ){
            store.setLoading(true);
            store.registrationUser(store.login, store.password, store.soname, store.name, store.patronymic, managerId)
            .then(response => {
                if (response.message) {
                    store.setMessage(response.message);
                    store.setError(true);
                    setTimeout(()=>store.setError(false), 5000);
                    store.setLoading(false);
                    return
                }
                
                if (response.status === 200) {
                    store.setUserInformationClear();  
                    navigate('/auth');
                }
            })
            .finally(()=>store.setLoading(false))

        } 
            else 
        {
            if (!regLog.test(store.login)) {
                store.setLoginError(true);
                setTimeout(()=>store.setLoginError(false), 5000);    
            }
            if (!regPass.test(store.password)) {
                store.setPasswordError(true);
                setTimeout(()=>store.setPasswordError(false), 5000);
            }
            if (!regName.test(store.soname)) {
                store.setSonameError(true);
                setTimeout(()=>store.setSonameError(false), 5000);
            }
            if (!regName.test(store.name)) {
                store.setNameError(true);
                setTimeout(()=>store.setNameError(false), 5000);
            }
            if (!regName.test(store.patronymic)) {
                store.setPatronymicError(true);
                setTimeout(()=>store.setPatronymicError(false), 5000);
            }

        }
    }
    return {onClickEnterHandler, managerId, onChangeSelect, onClickAuthtorization};
}
