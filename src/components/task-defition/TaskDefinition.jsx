import React, {useEffect, useState} from 'react';
import styles from './TaskDefinition.module.css';
import {Button, Form} from "react-bootstrap";
import Deadline from "../deadline/DeadLine.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";
import {taskFormDataState} from "../../store/task_form_data.js";
import {setFormData} from "../../store/task_form_data.js";
import {insertTaskThunk} from "../../store/task_thunk.js";
import {endDataState, startDateState} from "../../store/deadlin.js";

const TaskDefinition = () => {
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();
    const formData = useSelector(taskFormDataState);
    const startDate = useSelector(startDateState);
    const endDate = useSelector(endDataState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(fetchAllMembersThunk());
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setFormData({...formData, [name] : value}));
    };

    const validateForm = (formData) => {
        if (!formData.task_title) {
            setErrorMessage('فیلد عنوان ضروری است و باید تکمیل شود.');
            return false;
        }
        if (!formData.estimated_time) {
            setErrorMessage('فیلد زمان تخمینی ضروری است و باید تکمیل شود.');
            return false;
        }
        if (!formData.priority) {
            setErrorMessage('فیلد اولویت ضروری است و باید تکمیل شود.');
            return false;
        }
        if (!formData.startDate) {
            setErrorMessage('فیلد تاریخ شروع تسک ضروری است و باید تکمیل شود.');
            return false;
        }
        if (!formData.endDate) {
            setErrorMessage('فیلد تاریخ پایان تسک ضروری است و باید تکمیل شود.');
            return false;
        }
        if (!formData.expert) {
            setErrorMessage('فیلد کارشناس مجری ضروری است و باید تکمیل شود.');
            return false;
        }
        if (!formData.status) {
            setErrorMessage('فیلد تعیین وضعیت تسک ضروری است و باید تکمیل شود.');
            return false;
        }
        return true;
    }

    const handleSubmitTaskForm = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            startDate: startDate,
            endDate: endDate
        };
        dispatch(setFormData(updatedFormData));
        if (validateForm(formData)) {
            const result = await dispatch(insertTaskThunk(formData));
            if (result.meta.requestStatus === "fulfilled") {
                setSuccessMessage("عالی! تسک مورد نظر با موفقیت ایجاد شد.");
                setErrorMessage("");
            }else{
                setErrorMessage("درج اطلاعات با مشکل مواجه گردید. لطفا بعدا مجدد تلاش نمایید.");
            }
        };

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <h1 className={'header_titr'}>تعریف تسک</h1>

            {errorMessage && (
                <h3 className={'error_message'}>{errorMessage}</h3>
            )}

            {successMessage && (
                <h3 className={'success_message'}>{successMessage}</h3>
            )}

            <Form onSubmit={handleSubmitTaskForm}>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'task_title'}>عنوان تسک : </Form.Label>
                    <Form.Control type={'text'} id={'task_title'} name={'task_title'} onChange={handleChange} />
                </Form.Group>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'estimated_time'}>زمان تخمینی : </Form.Label>
                    <Form.Control type={'number'} id={'estimated_time'} name={'estimated_time'} onChange={handleChange} />
                </Form.Group>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'priority'}>اولویت : </Form.Label> <span>{formData.priority}</span>
                    <Form.Control type={'range'} id={'priority'} min={1} max={10} name={'priority'} onChange={handleChange} />
                </Form.Group>

                <Deadline />

                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'expert'}>کارشناس مجری : </Form.Label>
                    <Form.Select
                        aria-label="Select expert"
                        id={'expert'}
                        onChange={handleChange}
                        name={'expert'}
                        multiple={false}
                    >
                        <option value="0" disabled={true} selected={true}>انتخاب نمایید ...</option>
                        {membersList.map(member => (
                            <option key={member.id} value={member.user_name}>{member.first_name} {member.last_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'status'}>وضعیت : </Form.Label>
                    <Form.Select
                    id={'status'}
                    name={'status'}
                    onChange={handleChange}
                    >
                        <option value="0" disabled={true} selected={true}>انتخاب کنید ...</option>
                        <option value="not_started">شروع نشده</option>
                        <option value="waiting">در انتظار</option>
                        <option value="doing">در حال انجام</option>
                        <option value="completed">تکمیل شده</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'attachment'}>فایل های پیوست : </Form.Label>
                    <Form.Control type={'file'}  multiple />
                    <Form.Text className="text-muted">این بخش در آینده قابل توسعه است.</Form.Text>
                </Form.Group>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'description'}>توضیحات : </Form.Label>
                    <Form.Control as={'textarea'} id={'description'} rows={5} name={'description'} onChange={handleChange} />
                </Form.Group>

                <Button type={'submit'} className={'button_form'}>ایجاد</Button>
            </Form>

        </div>
    );
};

export default TaskDefinition;
