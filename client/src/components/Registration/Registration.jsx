import React, { useContext } from 'react';
import styles from './Registration.module.css';

import MyInput from '../UI/MyInput/MyInput';
import MyButton from '../UI/MyButton/MyButton';
import MySelect from '../UI/MySelect/MySelect';
import Loading from '../UI/Loading/Loading';

import {Context} from "../../index";
import { observer } from 'mobx-react-lite';
import { useRegistration } from '../../hooks/useRegistration';


const Registration = () => {
    const {store} = useContext(Context);
    const {onClickEnterHandler, managerId, onChangeSelect, onClickAuthtorization} = useRegistration();


    return (
       <div className={styles.wrapper}>
            {store.isLoading ? <Loading className={styles.loading}/> : null}
            <div className={styles.authForm}>
                <div className={styles.authFormTopMenu}>
                    <div className={styles.authChk} onClick={onClickAuthtorization}>Авторизация</div>
                    <div className={[styles.authChk, styles.checked].join(' ')}>Регистрация</div>
                    {store.error ? <div className={styles.errorMessage}>{store.message}</div> : null}
                </div>
                <div className={styles.inputLogin}>
                    <MyInput 
                        type="text"
                        placeholder="Логин"
                        imagePath="./img/user.png"
                        onChange={(event)=>store.setLogin(event.target.value)}
                        warning={store.loginError}
                        warningText="Логин должен состоять из 8 заглавных или строчных букв и цифр "
                    />    
                </div>
                <div className={styles.inputs}>
                    <MyInput
                        type="password"
                        placeholder="Пароль"
                        imagePath="./img/lock.png"
                        onChange={(event)=>store.setPassword(event.target.value)}    
                        warning={store.passwordError}
                        warningText="Пароль должен состоять из 8 заглавных и строчных букв, цифр, а также спецсимвола"
                    />
                </div>
                <div className={styles.inputs}>
                    <MyInput 
                        type="text"
                        placeholder="Фамилия"
                        imagePath="./img/bage.png"
                        onChange={(event)=>store.setSoname(event.target.value)}
                        warning={store.sonameError}
                        warningText="Фамилия должена состоять из кириллицы"
                    />    
                </div>
                <div className={styles.inputs}>
                    <MyInput 
                        type="text"
                        placeholder="Имя"
                        imagePath="./img/bage.png"
                        onChange={(event)=>store.setName(event.target.value)}
                        warning={store.nameError}
                        warningText="Имя должено состоять из кириллицы"
                    />    
                </div>
                <div className={styles.inputs}>
                    <MyInput 
                        type="text"
                        placeholder="Отчество"
                        imagePath="./img/bage.png"
                        onChange={(event)=>store.setPatronymic(event.target.value)}
                        warning={store.patronymicError}
                        warningText="Отчество должено состоять из кириллицы"
                    />    
                </div>
                <div className={styles.inputs}>
                    <MySelect
                        className={styles.select}
                        options={store.users}
                        defaultValue="Выбирите руководителя..."
                        isDefaultValue={true}
                        value={managerId}
                        onChange={onChangeSelect}
                    />    
                </div>
                <div className={styles.buttonEnter}>
                    <MyButton callback={onClickEnterHandler}>Зарегистрировать&gt;</MyButton>
                </div>
            </div>
        </div>
    );
};

export default observer(Registration);