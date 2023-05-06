import React from 'react';
import styles from './MyInput.module.css';
import { observer } from 'mobx-react-lite';

const MyInput = ({warningText, warning, imagePath, ...props}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.imgContainer}>
                <img alt="" src={imagePath}/>
            </div>          
            <input className={styles.myInput} {...props} />     
            {warning ? <div className={styles.message}>{warningText}</div> : null}
        </div>
    );
};

export default observer(MyInput);