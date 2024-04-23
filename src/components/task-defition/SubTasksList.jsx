import React, {useState, useEffect} from 'react';
import {Col} from "react-bootstrap";
import styles from "./SubTasks.module.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteSubTaskThunk, fetchSubTaskThunk, subTasksState} from "../../store/subTask_thunk.js";
import {NavLink} from "react-router-dom";


const SubTasksList = ({taskId, getUserName, statusTaskObj}) => {

    const {subTasksList} = useSelector(subTasksState);
    const dispatch = useDispatch();
    const subTasksListLength = subTasksList.length ? subTasksList.length : 0;
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        dispatch(fetchSubTaskThunk(taskId));
    }, [subTasksListLength]);

    const handleDeleteSubTask = async (subTaskId) => {
        const isConfirmed = window.confirm('آیا مطمئنید که می‌خواهید این زیر تسک را حذف کنید؟');

        if (isConfirmed) {
            const result = await dispatch(deleteSubTaskThunk(subTaskId));
            if (result.meta.requestStatus === "fulfilled") {
                setSuccessMessage('عالی! این زیر تسک با موفقیت حذف شد.');
                setErrorMessage("");
            }else{
                setErrorMessage("حذف زیر تسک با مشکل مواجه گردید. لطفا بعدا مجدد تلاش نمایید.");
            }

            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    return (
        <>
            {subTasksList.length > 0 && subTasksList.map((subTaskItem) => (
                <Col sm={6} key={subTaskItem.id}>
                    <div className={`${styles['subTask_content']} ${subTaskItem.subTaskStatus === "not_started" ? styles['not_started'] : subTaskItem.subTaskStatus === "waiting" ? styles['waiting'] : subTaskItem.subTaskStatus === "doing" ? styles['doing'] : subTaskItem.subTaskStatus === "completed" ? styles['completed'] : ''}`}>
                        <div className={styles['subTask_title']}>
                            <span>عنوان : </span>
                            <span>{subTaskItem.subTaskTitle}</span>
                        </div>
                        <div className={styles['subTask_expert']}>
                            <span>کارشناس : </span>
                            <span>{getUserName(subTaskItem.subTaskExpert)}</span>
                        </div>
                        <div className={styles['subTask_status']}>
                            <span>وضعیت : </span>
                            <span>{statusTaskObj[subTaskItem.subTaskStatus]}</span>
                        </div>
                        <div className={styles['subTask_startDate']}>
                            <span>تاریخ شروع : </span>
                            <span>{subTaskItem.subTaskStartDate}</span>
                        </div>
                        <div className={styles['subTask_endDate']}>
                            <span>تاریخ پایان : </span>
                            <span>{subTaskItem.subTaskEndDate}</span>
                        </div>
                        <div className={styles['subTask_priority']}>
                            <span>اولویت : </span>
                            <span>{subTaskItem.subTaskPriority}</span>
                        </div>
                        <div className={styles['subTask_estimateTime']}>
                            <span>تخمین : </span>
                            <span>{subTaskItem.subTaskEstimateTime}</span>
                        </div>
                        <div className={styles['subTask_description']}>
                            <span>توضیحات : </span>
                            <span>{subTaskItem.subTaskDescription}</span>
                        </div>

                        <div className={styles['button_action']}>
                            <NavLink to={`/edit-subTask/${subTaskItem.id}`}><span className={styles['action_item']}>ویرایش</span></NavLink>
                            <span className={styles['action_item']} onClick={() => handleDeleteSubTask(subTaskItem.id)}>حذف</span>
                        </div>
                    </div>
                </Col>
            ))}
        </>
    );
};

export default SubTasksList;
