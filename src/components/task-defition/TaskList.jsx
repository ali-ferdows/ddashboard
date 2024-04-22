import React, {useEffect, useState} from 'react';
import styles from './TaskList.module.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteTaskThunk, fetchTasksThunk, tasksListState} from "../../store/task_thunk.js";
import {Loading} from "../index.js";
import {
    ChevronLeft,
    ChevronRight,
    Funnel,
    ListTask
} from "react-bootstrap-icons";
import {Button, Col, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import TasksFilter from "./TasksFilter.jsx";
import {taskFilterState} from "../../store/period_filter_task.js";
import {
    decrementPageNumberTasks,
    incrementPageNumberTasks,
    pageNumberTasksState
} from "../../store/page_number_tasks.js";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";
import {statusTaskObj} from "../../Layout/index.js";

const TaskList = () => {
    const { tasksList, loading, error } = useSelector(tasksListState);
    const {membersList} = useSelector(memberState);
    const [showFilter, setShowFilter] = useState(false);
    const pageNumber = useSelector(pageNumberTasksState);
    const formData = useSelector(taskFilterState);
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(fetchAllMembersThunk());
    }, []);

    const getUserName = (username) => {
        const user = membersList.find(member => member.user_name === username);

        return user ? `${user.first_name} ${user.last_name}` : "نام کاربر نامشخص";
    };

    useEffect(() => {
        dispatch(fetchTasksThunk({pageNumber, formData}));
    }, [pageNumber]);

    const handleShowFilterForm = () => {
        setShowFilter(!showFilter);
    }

    const handleIncrementPageNumber = () => {
        dispatch(incrementPageNumberTasks());
    }

    const handleDecrementPageNumber = () => {
        dispatch(decrementPageNumberTasks())
    }

    const handleDeleteTask = async (taskId) => {
        const isConfirmed = window.confirm('آیا مطمئنید که می‌خواهید این تسک را حذف کنید؟');

        if (isConfirmed) {
            const result = await dispatch(deleteTaskThunk(taskId));
            if (result.meta.requestStatus === "fulfilled") {
                setSuccessMessage('عالی! این تسک با موفقیت حذف شد.');
                setErrorMessage("");
            }else{
                setErrorMessage("حذف تسک با مشکل مواجه گردید. لطفا بعدا مجدد تلاش نمایید.");
            }

            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    if (error) {
        return (
            <div>
                <h1 className={'header_titr'}>لیست تسک ها</h1>

                <h3 className={'error_message'}>داده ای جهت نمایش وجود ندارد.</h3>

            </div>
        )
    }

    return (
        <div>
            <h1 className={'header_titr'}>لیست تسک ها</h1>

            <Funnel size={30} className={styles['filter_icon']} onClick={handleShowFilterForm} />

            {errorMessage && (
                <h3 className={'error_message'}>{errorMessage}</h3>
            )}

            {successMessage && (
                <h3 className={'success_message'}>{successMessage}</h3>
            )}

            {showFilter && (
                <TasksFilter />
            )}

            {loading ? (
                <Loading />
            ) :

                tasksList.length > 0 ? (
                <Row className={`${styles['task_contents']} g-2`}>
                    {tasksList.map(task => {
                        return (

                        <Col sm={6} xs={12} key={task.id}>
                            <div className={`${styles['task_content']} ${task.status === "not_started" ? styles['not_started'] : task.status === "waiting" ? styles['waiting'] : task.status === "doing" ? styles['doing'] : task.status === "completed" ? styles['completed'] : ''}`}>
                            <div className={styles['header']}>
                                    <div className={styles['title']}>
                                        <span className={styles['icon_title']}><ListTask size={30} /></span>
                                        {task.task_title}
                                    </div>
                                    <div className={`${styles['deadline_status']} d-flex justify-content-between align-items-center`}>
                                        <span>{task.startDate} - {task.endDate}</span>
                                        <span>{getUserName(task.expert)}</span>
                                        <span>{statusTaskObj[task.status]}</span>
                                    </div>
                                </div>
                                <div className={styles['body']}>
                                    <NavLink to={`/task-info/${task.id}`}><span className={styles['body_item']}>جزئیات</span></NavLink>
                                    <NavLink to={`/subtask/${task.id}`}><span className={styles['body_item']}>افزودن زیرتسک</span></NavLink>
                                    <NavLink to={`/edit-task/${task.id}`}><span className={styles['body_item']}>ویرایش</span></NavLink>
                                    <span className={styles['body_item']} onClick={() => handleDeleteTask(task.id)}>حذف</span>
                                </div>
                            </div>
                        </Col>
                        )
                    })}
                        <Col xs={12} className={`${styles['pagination']} d-flex justify-content-center`}>
                            <Button className={'button_form'} onClick={handleIncrementPageNumber} disabled={tasksList.length < 10}>
                                <ChevronRight size={20} />
                            </Button>
                            <span className={styles['page_number']}>{pageNumber}</span>
                            <Button className={'button_form'} onClick={handleDecrementPageNumber} disabled={pageNumber === 1}>
                                <ChevronLeft size={20} />
                            </Button>
                        </Col>

                </Row>
            ) : (
                <div>
                    <h3 className={'error_message'}>داده ای جهت نمایش وجود ندارد.</h3>
                </div>
            ) }

        </div>
    );
};

export default TaskList;
