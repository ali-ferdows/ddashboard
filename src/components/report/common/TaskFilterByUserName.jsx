import React, {useEffect, useState} from 'react';
import styles from "./TaskFilterByUserName.module.css";
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMembersThunk, memberState} from "../../../store/member.js";
import {fetchTasksThunk, tasksListState} from "../../../store/task_thunk.js";
import {setTaskFilterForm, taskFilterState} from "../../../store/period_filter_task.js";
import moment from "moment-jalaali";
import {setTheMemberSubTasksList, setTheMemberTasksList} from "../../../store/tasks_subTasks_list.js";
import {fetchSubTaskMemberThunk, subTasksState} from "../../../store/subTask_thunk.js";

const TaskFilterByUserName = () => {

    const { tasksList } = useSelector(tasksListState);
    const { membersList } = useSelector(memberState);
    const { subTasksList } = useSelector(subTasksState);
    const formData = useSelector(taskFilterState);
    const dispatch = useDispatch();
    const [period, setPeriod] = useState('');

    useEffect(() => {
        dispatch(fetchAllMembersThunk())
    }, []);

    const handleChangeFilterForm = (e) => {
        const {name, value} = e.target;
        dispatch(setTaskFilterForm({...formData, [name] : value}));
    }

    const handleSelectedPeriod = (value) => {
        setPeriod(value);
        const nowDate = moment();
        let newFromDate = '';
        switch (value) {
            case 'weekly':
                newFromDate = moment().subtract(7, 'days').format('jYYYY/jM/jD');
                break;
            case 'monthly':
                newFromDate = moment().subtract(1, 'months').format('jYYYY/jM/jD');
                break;
            case 'seasonal':
                if (nowDate.jMonth() >= 0 && nowDate.jMonth() <= 2){
                    newFromDate = moment(nowDate).jMonth(0).jDate(1).format('jYYYY/jM/jD');
                } else if (nowDate.jMonth() >= 3 && nowDate.jMonth() <= 5){
                    newFromDate = moment(nowDate).jMonth(3).jDate(1).format('jYYYY/jM/jD');
                } else if (nowDate.jMonth() >= 6 && nowDate.jMonth() <= 8){
                    newFromDate = moment(nowDate).jMonth(6).jDate(1).format('jYYYY/jM/jD');
                } else {
                    newFromDate = moment(nowDate).jMonth(9).jDate(1).format('jYYYY/jM/jD');
                }
                break;
            case 'yearly':
                newFromDate = moment().subtract(1, 'years').format('jYYYY/jM/jD');
                break;
            default:
                newFromDate = '';
                break;
        }

        dispatch(setTaskFilterForm({
            ...formData,
            from_date: newFromDate,
            to_date: nowDate.format('jYYYY/jM/jD'),
        }));

    }

    useEffect(() => {
        const pageNumber = '';
        dispatch(fetchTasksThunk({pageNumber, formData}));
        const filterParams = {
            subTaskExpert: formData['expert'],
            subTaskStartDate: formData['from_date'],
            subTaskEndDate: formData['to_date'],
            subTaskStatus: '',
        };

        dispatch(fetchSubTaskMemberThunk(filterParams));
    }, [formData])

    const handleSubmitFilterForm = (e) => {
        e.preventDefault();

        dispatch(setTheMemberTasksList(tasksList));
        dispatch(setTheMemberSubTasksList(subTasksList));
    }

    return (
        <>
            <Form className={styles['task_filter_form']} onSubmit={handleSubmitFilterForm}>
                <Form.Group className={`form_group w-100 ${styles['expert']}`}>
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
                <Form.Group className={'form_group w-100'}>
                    <Form.Label>بازه گزارش گیری : </Form.Label>
                    <div className={`${styles['deadline']} d-flex justify-content-between align-items-center`}>
                        <span onClick={() => handleSelectedPeriod('weekly')} className={period === 'weekly' ? `${styles['active']}` : ``}>هفتگی</span>
                        <span onClick={() => handleSelectedPeriod('monthly')} className={period === 'monthly' ? `${styles['active']}` : ``}>ماهیانه</span>
                        <span onClick={() => handleSelectedPeriod('seasonal')} className={period === 'seasonal' ? `${styles['active']}` : ``}>فصلی</span>
                        <span onClick={() => handleSelectedPeriod('yearly')} className={period === 'yearly' ? `${styles['active']}` : ``}>سالیانه</span>
                        <span onClick={() => handleSelectedPeriod('all')} className={period === 'all' ? `${styles['active']}` : ``}>همه</span>
                    </div>
                </Form.Group>
                <div className={styles['button']}>
                    <Button type={"submit"} className={'button_form'}>اعمال فیلتر</Button>
                </div>
            </Form>
        </>
    );
};

export default TaskFilterByUserName;