/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './SessionsDefinition.module.css';
import {ModalShowDate} from "./ModalShowDate";
import FormSession from "./FormSession";
import {useDispatch, useSelector} from "react-redux";
import {setModalShow} from "../../store/modal_show.js";

const SessionsDefinition = () => {

    const dispatch = useDispatch();
    const modalShow = useSelector(state => state.modalState.modalShow);

    return (
        <div>
            <h1 className={'header_titr'}>تنظیم جلسه</h1>

            <div className={styles['sessions_definition_contents']}>
                <FormSession />
            </div>

            <ModalShowDate
                show={modalShow}
                onHide={() => { dispatch(setModalShow(false)) }}
            />

        </div>
    );
};

export default SessionsDefinition;
