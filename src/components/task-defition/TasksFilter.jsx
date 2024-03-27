import React, {useEffect} from 'react';
import styles from './TasksFilter.module.css';
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";
import PeriodFilter from "./PeriodFilter.jsx";
import {setTaskFilterForm, taskFilterState} from "../../store/period_filter_task.js";
import {fetchTasksThunk} from "../../store/task_thunk.js";
import {pageNumberTasksState} from "../../store/page_number_tasks.js";

const TasksFilter = () => {

    const {membersList, loading, error} = useSelector(memberState);
    const pageNumber = useSelector(pageNumberTasksState);
    const formData = useSelector(taskFilterState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllMembersThunk());
    }, []);

    const handleChangeFilterForm = (e) => {
        const {name, value} = e.target;
        dispatch(setTaskFilterForm({...formData, [name] : value}));
    }

    const handleSubmitFilterForm = async (e) => {
        e.preventDefault();

        dispatch(fetchTasksThunk({pageNumber, formData}));
    }


    return (
        <>
            <Form className={styles['task_filter_form']} onSubmit={handleSubmitFilterForm}>
                <Form.Group className={`form_group ${styles['task_title']}`}>
                    <Form.Label htmlFor={'task_title'}>عنوان تسک : </Form.Label>
                    <Form.Control type={'text'} id={'task_title'} name={'task_title'} onChange={handleChangeFilterForm} />
                </Form.Group>

                <PeriodFilter />

                <Form.Group className={`form_group ${styles['expert']}`}>
                    <Form.Label htmlFor={'expert'}>کارشناس مجری : </Form.Label>
                    <Form.Select id={'expert'} name={'expert'} onChange={handleChangeFilterForm}>
                        <option value="" selected={true}>انتخاب کنید ...</option>
                        {membersList.length > 0 && (
                            membersList.map(member => {
                                return (
                                    <option value={member.user_name} key={member.id}>{member.first_name} {member.last_name}</option>
                                )
                            })
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className={`form_group ${styles['status']}`}>
                    <Form.Label htmlFor={'status'}>وضعیت تسک : </Form.Label>
                    <Form.Select id={'status'} name={'status'} onChange={handleChangeFilterForm}>
                        <option value="" selected={true}>انتخاب کنید ...</option>
                        <option value="not_started">شروع نشده</option>
                        <option value="waiting">در انتظار</option>
                        <option value="doing">در حال انجام</option>
                        <option value="completed">تکمیل شده</option>
                    </Form.Select>
                </Form.Group>
                <div className={styles['button']}>
                    <Button type={"submit"} className={'button_form'}>اعمال فیلتر</Button>
                </div>
            </Form>
        </>
    );
};

export default TasksFilter;
