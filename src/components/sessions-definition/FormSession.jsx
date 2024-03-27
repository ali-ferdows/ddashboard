/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import styles from "./SessionsDefinition.module.css";
import AddEmail from "./AddEmail.jsx";
import TableOfEmails from "./TableOfEmails.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectDate} from "../../store/selected_session_date.js";
import {setModalShow} from "../../store/modal_show.js";
import {setSelectedExperts} from "../../store/guest_experts.js";
import {selectFormData, setFormData} from "../../store/form_data.js";

const FormSession = () => {

    const selectedExperts = useSelector(state => state.InvitedExperts.selectedExperts);
    const date = useSelector(selectDate);
    const dispatch = useDispatch();
    const formData = useSelector(selectFormData);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);

    const handleSelectChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        dispatch(setSelectedExperts(selectedOptions));
    };

    useEffect(() => {
        dispatch(setFormData({
          ...formData,
          invited_expert: selectedExperts.join(', '),
        }));
    }, [selectedExperts]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormData({...formData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = [];

        if (!formData.session_title.trim()) {
            newErrors.push("لطفاً عنوان جلسه را وارد کنید.");
        }

        if (!formData.session_date.trim()) {
            dispatch(setFormData({
                ...formData,
                session_date: date,
            }));
            newErrors.push("مشکلی در ذخیره اطلاعات بوجود آمد، لطفا مجدد تلاش نمایید.");
        }

        if (!formData.session_time.trim()) {
            newErrors.push("لطفاً زمان جلسه را وارد کنید.");
        }

        if (!formData.invited_expert.trim()) {
            newErrors.push("لطفاً کارشناس (کارشناسان) حاضر در جلسه را انتخاب کنید.");
        }

        setErrorMessage(newErrors);

        return newErrors.length === 0;
    };

    const handleSubmitedFormSession = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3001/scheduled-meeting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('Data successfully sent to JSON Server');
                    setSuccessMessage('عالی! جلسه با موفقیت افزوده شد.');
                    setErrorMessage(['']);
                    document.getElementById("create-session-form").reset();
                } else {
                    console.error('Failed to send data to JSON Server');
                    setErrorMessage(['متاسفانه مشکلی در ذخیره اطلاعات رخ داده است. لطفاً دوباره تلاش کنید.']);
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage(['متاسفانه یک مشکل فنی رخ داده است. لطفاً به پشتیبانی ما اطلاع دهید.']);
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <>
            {successMessage && <h1 className={'success_message'}>{successMessage}</h1>}
            {errorMessage && errorMessage.map((message, index) => (<><h1 key={index} className={styles['error_message']}>{message}</h1><br/></>))}
            <Form onSubmit={handleSubmitedFormSession} id={'create-session-form'}>
                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_title'}>عنوان جلسه : </Form.Label>
                    <Form.Control type={'text'} name={'session_title'} id={'session_title'} onChange={handleChange} />
                </Form.Group>

                <Form.Group className={`${styles['form_group']} ${styles['date_selector']}`}>
                    <div>
                        <Form.Label htmlFor={'session_date'}>تاریخ : </Form.Label>
                        <Form.Control type={'text'} name={'session_date'} className={styles['session_date_field']} id={'session_date'} value={date} onClick={() => { dispatch(setModalShow(true));}} />
                    </div>
                    <div>
                        <Form.Label htmlFor={'session_time'}>ساعت : </Form.Label>
                        <Form.Control type={'time'} name={'session_time'} className={styles['session_time_field']} id={'session_time'} onChange={handleChange} />
                    </div>
                </Form.Group>

                <Form.Group className={`${styles['form_group']} ${styles['expert_selector']}`}>
                    <Form.Label htmlFor={'invited_expert'}>انتخاب مهمانان : </Form.Label>
                    <Form.Select
                        aria-label="Select expert"
                        id={'invited_expert'}
                        className={styles['invited_expert_field']}
                        onChange={handleSelectChange}
                        multiple
                        value={selectedExperts}
                        name={'invited_expert'}
                    >
                        <option value="ali@gmail.com">علی</option>
                        <option value="reza@gmail.com">رضا</option>
                        <option value="hasan@gmail.com">حسن</option>
                        <option value="hossein@gmail.com">حسین</option>
                        <option value="karim@gmail.com">کریم</option>
                        <option value="kazem@gmail.com">کاظم</option>
                    </Form.Select>

                    <AddEmail />

                </Form.Group>

                <TableOfEmails />

                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_point'}>نکات مهم جلسه : </Form.Label>
                    <Form.Control as="textarea" rows={5} name={'session_point'} id={'session_point'} onChange={handleChange} />
                </Form.Group>

                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'session_reminder'}>یادآوری : </Form.Label>
                    <Form.Control as="textarea" rows={5} name={'session_reminder'} id={'session_reminder'} onChange={handleChange} />
                </Form.Group>


                <Button type={'submit'} className={'button_form'}>تنظیم جلسه</Button>
            </Form>
        </>
    );
};

export default FormSession;
