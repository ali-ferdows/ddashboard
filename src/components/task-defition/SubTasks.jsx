import React, {useEffect, useState} from 'react';
import styles from './SubTasks.module.css';
import {useParams} from "react-router";
import {NotFoundPage} from "../../pages";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleTaskThunk} from "../../store/task_thunk.js";
import {Loading} from "../index.js";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";
import {Col, Row} from "react-bootstrap";
import SubTasksList from "./SubTasksList.jsx";
import AddSubTasksForm from "./AddSubTasksForm.jsx";
import {statusTaskObj} from "../../Layout/index.js";
import {NavLink} from "react-router-dom";

const SubTasks = () => {

    const {taskId} = useParams();
    const {taskItem, loading, error} = useSelector((state) => state.tasksList);
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();

    if (isNaN(parseInt(taskId)) || error) {
        return <NotFoundPage />;
    }

    useEffect(() => {
        dispatch(fetchSingleTaskThunk(taskId));
        dispatch(fetchAllMembersThunk());
    }, []);

    if (taskItem.is_deleted) {
        return (
            <>
                <h1 className={'header_titr'}>افزودن زیر تسک</h1>
                
                <h3 className="error_message">این تسک حذف شده است.</h3>
                
                <NavLink to={'/tasks-list'} className={'d-block text-primary-emphasis text-center p-4 shadow'}>بازگشت به لیست تسک ها</NavLink>
            </>
        )
    }

    const getUserName = (username) => {
        const user = membersList.find(member => member.user_name === username);

        return user ? `${user.first_name} ${user.last_name}` : "نام کاربر نامشخص";
    };

    return (
        <div>
            <h1 className={'header_titr'}>افزودن زیر تسک</h1>

            {loading ? (
                <Loading />
            ) : (
                <>

                    <Row  className={'g-2'}>
                        <Col xs={12}>
                            <div className={`${styles['task_info_contents']} ${taskItem.status === "not_started" ? styles['not_started'] : taskItem.status === "waiting" ? styles['waiting'] : taskItem.status === "doing" ? styles['doing'] : taskItem.status === "completed" ? styles['completed'] : ''}`}>
                                <div className={styles['task_title']}>
                                    <span>عنوان تسک : </span>
                                    <span>{taskItem.task_title}</span>
                                </div>
                                <div className={styles['task_status']}>
                                    <span>وضعیت تسک : </span>
                                    <span>{statusTaskObj[taskItem.status]}</span>
                                </div>
                                <div className={styles['task_estimate']}>
                                    <span>زمان تخمینی : </span>
                                    <span>{taskItem.estimated_time} ساعت</span>
                                </div>
                                <div className={styles['task_priority']}>
                                    <span>اولویت از 10 : </span>
                                    <span>{taskItem.priority}</span>
                                </div>
                                <div className={styles['task_expert']}>
                                    <span>کارشناس مجری : </span>
                                    <span>{getUserName(taskItem.expert)}</span>
                                </div>
                                <div className={styles['task_deadline']}>
                                    <div>
                                        <span>تاریخ شروع تسک : </span>
                                        <span>{taskItem.startDate}</span>
                                    </div>
                                    <div>
                                        <span>تاریخ پایان تسک : </span>
                                        <span>{taskItem.endDate}</span>
                                    </div>
                                </div>
                                <div>
                                    <span>توضیحات : </span>
                                    <span>{taskItem.description}</span>
                                </div>
                            </div>
                        </Col>
                        <SubTasksList taskId={taskId} getUserName={getUserName} statusTaskObj={statusTaskObj} />
                    </Row>

                    <AddSubTasksForm taskId={taskId} membersList={membersList} />

                </>
            )}
        </div>
    );
};

export default SubTasks;
