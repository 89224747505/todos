import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";

export const useAuth = function() {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    
    const onClickRegistration = () => {
        navigate('/registration');
    }

    const onClickEnterHandler = () => {
        
        const regLog = /^[A-Za-z0-9]{4,40}$/;
        const regPass = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),./:;'\|{} "]).*$/;
        
        if (regPass.test(store.password) && regLog.test(store.login)) 
        {
            store.setLoading(true);

            store.loginUser(store.login, store.password)
            .then(response => {
                if (response.message) {
                    store.setMessage(response.message);
                    store.setError(true);
                    setTimeout(()=>store.setError(false), 5000);
                    store.setAuth(false);
                    store.setLoading(false);
                    return
                }
                
                if (response.status === 200) {
                    localStorage.setItem('AccessJwt', response.data.accessToken);
                    store.setAuth(true);
                    store.setUser(response.data.user);
                    navigate('/');
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
        }
    }
    return {onClickEnterHandler, onClickRegistration};
}
