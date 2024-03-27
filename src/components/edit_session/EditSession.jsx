// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import styles from './EditSession.module.css';
import {Button, Form} from "react-bootstrap";
import TableOfEmailsEdit from "./TableOfEmailsEdit";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {editSessionThunk, fetchSessionListThunk} from "../../store/fetchSessionList.js";
import {Loading} from "../index.js";
import {PersonPlus} from "react-bootstrap-icons";

const EditSession = () => {
    const dispatch = useDispatch();
    const {sessionId} = useParams();
    const {sessionList} = useSelector(state => state.sessionList);
    const [sessionItem, setSessionItem] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        dispatch(fetchSessionListThunk())
    }, []);

    useEffect(() => {
        const filteredSession = sessionList.filter(session => session.id == sessionId);
        if (filteredSession.length > 0) {
            setSessionItem(filteredSession[0]);
        } else {
            setSessionItem(null);
        }
    }, [sessionList, sessionId]);

    const [newEmail, setNewEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleAddEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(newEmail);

        if (newEmail && isEmailValid) {
            if (!sessionItem.invited_expert.includes(newEmail)) {
                const updatedInvitedExpert = sessionItem.invited_expert.concat(",",newEmail);
                setSessionItem(prevState => ({
                    ...prevState,
                    invited_expert: updatedInvitedExpert
                }));
            }
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSessionItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitFormEditSession = async (event) => {
        event.preventDefault();
        const result = await dispatch(editSessionThunk({sessionItem, sessionId}));
        if (result.meta.requestStatus === "fulfilled") {
            setSuccessMessage("عالی! جلسه با موفقیت ویرایش شد.");
            setErrorMessage("");
        }else{
            setErrorMessage("ویرایش اطلاعات با مشکل مواجه گردید. لطفا بعدا مجدد تلاش نمایید.");
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    if (!sessionItem) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <h1 className={'header_titr'}>ویرایش جلسه</h1>

            {successMessage && <h1 className={'success_message'}>{successMessage}</h1>}
            {errorMessage && <h1 className={'error_message'}>{errorMessage}</h1>}

            <Form key={sessionItem.id} onSubmit={handleSubmitFormEditSession} id={'create-session-form'}>
                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_title'}>عنوان جلسه : </Form.Label>
                    <Form.Control type={'text'} name={'session_title'} id={'session_title'} value={sessionItem.session_title}
                                  onChange={handleChange}/>
                </Form.Group>

                <Form.Group className={`${styles['form_group']} ${styles['date_selector']}`}>
                    <div>
                        <Form.Label htmlFor={'session_date'}>تاریخ : </Form.Label>
                        <Form.Control type={'text'} name={'session_date'} className={styles['session_date_field']}
                                      id={'session_date'} value={sessionItem.session_date} onChange={handleChange}/>
                    </div>
                    <div>
                        <Form.Label htmlFor={'session_time'}>ساعت : </Form.Label>
                        <Form.Control type={'time'} name={'session_time'} className={styles['session_time_field']}
                                      id={'session_time'} value={sessionItem.session_time} onChange={handleChange}/>
                    </div>
                </Form.Group>

                <TableOfEmailsEdit emailList={sessionItem.invited_expert} />

                <Form.Group className={`${styles['form_group']} ${styles['expert_selector']}`}>
                    <Form.Label htmlFor={'invited_expert'}>افزودن : </Form.Label>

                    <Form.Control
                        type="email"
                        className={styles['email_other_guests']}
                        placeholder="test@email.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        isInvalid={!isValidEmail}
                    />
                    <Form.Control.Feedback type="invalid" className={styles['feedback_message']}>
                        فرمت ایمیل نامعتبر است.
                    </Form.Control.Feedback>
                    <PersonPlus size={25} onClick={handleAddEmail} />

                </Form.Group>

                {sessionItem.session_point && (
                <ol>
                    <p>نکات جلسه</p>
                    {sessionItem.session_point.split('\n').map(point => (
                        <li key={point}>{point}</li>
                    ))}
                </ol>
                )}

                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_point'}>افزودن نکات جدید : </Form.Label>
                    <Form.Control as="textarea" rows={5} name={'session_point'} id={'session_point'}
                                  onChange={handleChange}/>
                </Form.Group>

                {sessionItem.session_reminder && (
                    <ol>
                        <p>یادآوری جلسه</p>
                        {sessionItem.session_reminder.split('\n').map(reminder => (
                            <li key={reminder}>{reminder}</li>
                        ))}
                    </ol>
                )}

                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_reminder'}>یادآوری : </Form.Label>
                    <Form.Control as="textarea" rows={5} name={'session_reminder'} id={'session_reminder'}
                                  onChange={handleChange}/>
                </Form.Group>


                <Button type={'submit'} className={'button_form'}>تنظیم جلسه</Button>
            </Form>
        </>
    );
};

export default EditSession;
