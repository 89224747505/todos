import React from 'react';
import classes from "./Loading.module.css";
import {observer} from "mobx-react-lite";

const Loading = (props) => {
    return (
        <div {...props} >
            <div className={classes.preloader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default observer(Loading);