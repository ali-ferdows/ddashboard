/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import styles from './Feedback.module.css';
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchSessionListThunk} from "../../store/fetchSessionList.js";
import moment from "moment-jalaali";
import {Loading} from "../index.js";

const Feedback = () => {
    let {sessionList, loading, error} = useSelector(state => state.sessionList);
    const dispatch = useDispatch();
    const [names, setNames] = useState();
    const nowDate = moment().format('jYYYY/jM/jD');
    const mapExpert = {
        "ali@gmail.com": "علی",
        "reza@gmail.com": "رضا",
        "hasan@gmail.com" : "حسن",
        "hossein@gmail.com" : "حسین",
        "karim@gmail.com" : "کریم",
        "kazem@gmail.com" : "کاظم"
    }

    useEffect(() => {
        dispatch(fetchSessionListThunk());
    }, []);

    if (sessionList && sessionList.length > 0) {
        var sessionBeforeToday = sessionList.filter(session => {
            return session.session_date <= nowDate;
        });
    }

    const sessionSelected = (e) => {
        const sessionSelect = sessionBeforeToday.find(item => {
            return item.id == parseInt(e.target.value);
        });

        if (sessionSelect) {
            const invitedExperts = sessionSelect.invited_expert.split(',');
            const namesArray = invitedExperts.map(email => mapExpert[email.trim()] || email.trim());

            setNames(namesArray);
        }
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div>

                <h1 className={'header_titr'}>ارسال فیدبک</h1>

                <div className={styles['error_message']}>
                    <p>خطایی در حین پردازش رخ داده است. لطفا با پشتیبانی نرم افزار تماس بگیرید.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1 className={'header_titr'}>ارسال فیدبک</h1>

            <Form>
                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_list'}>جلسه : </Form.Label>
                    <Form.Select
                        id={'session_list'}
                        name={'session_list'}
                        onChange={sessionSelected}
                    >
                        <option value="0" disabled={true} selected={true}>انتخاب نمایید ...</option>
                        {sessionBeforeToday && sessionBeforeToday.map(session => (
                            <option key={session.id} value={session.id}>جلسه {session.session_title} در {session.session_date} - {session.session_time}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {names && names.length > 0 && (
                    <>
                        {names.map((name, index) => (
                            <div key={index}>
                                {name}
                            </div>
                        ))}
                    </>
                )}

                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_feedback'}>نکات و موارد مهم : </Form.Label>
                    <Form.Control as="textarea" row={5} name={'session_feedback'} id={'session_feedback'} />
                </Form.Group>
            </Form>
        </>
    );
};

export default Feedback;