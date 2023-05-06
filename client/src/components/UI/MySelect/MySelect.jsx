import React from 'react';
import styles from './MySelect.module.css';
import { observer } from 'mobx-react-lite';

const MySelect = ({options, defaultValue, onChange, value, isDefaultValue, ...props}) => {
    return (
        <select 
            {...props}
            value={value}
            onChange={event=>onChange(event.target.value)}
        >
            {isDefaultValue ? <option value="" disabled>{defaultValue}</option> : null}
            {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default observer(MySelect);