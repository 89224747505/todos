import React, { useContext } from 'react';
import styles from './Auth.module.css';

import MyInput from '../UI/MyInput/MyInput';
import MyButton from '../UI/MyButton/MyButton';
import Loading from '../UI/Loading/Loading';

import {Context} from "../../index";
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../hooks/useAuth';

const Auth = () => {
    const {store} = useContext(Context);
    
    const {onClickEnterHandler, onClickRegistration} = useAuth();

    return (
        <div className={styles.wrapper}>
            {store.isLoading ? <Loading className={styles.loading}/> : null}
            <div className={styles.authForm}>
                <div className={styles.authFormTopMenu}>
                    <div className={[styles.authChk, styles.checked].join(' ')}>Авторизация</div>
                    <div className={styles.authChk} onClick={onClickRegistration}>Регистрация</div>
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
                <div className={styles.inputPassword}>
                    <MyInput
                        type="password"
                        placeholder="Пароль"
                        imagePath="./img/lock.png"
                        onChange={(event)=>store.setPassword(event.target.value)}    
                        onKeyPress={event=> event.key === "Enter" ? onClickEnterHandler() : null}
                        warning={store.passwordError}
                        warningText="Пароль должен состоять из 8 заглавных и строчных букв, цифр, а также спецсимвола"
                    />
                </div>
                <div className={styles.buttonEnter}>
                    <MyButton callback={onClickEnterHandler}>Войти&gt;</MyButton>
                </div>
            </div>
        </div>
    );
};

export default observer(Auth);