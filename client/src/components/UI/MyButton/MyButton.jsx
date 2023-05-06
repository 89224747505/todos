import React from 'react';
import styles from './MyButton.module.css';
import { observer } from 'mobx-react-lite';

const MyButton = ({callback, ...props}) => {
    return (
        <button onClick={callback} className={styles.wrapper}>
            {props.children}
        </button>
    );{}
};

export default observer(MyButton);