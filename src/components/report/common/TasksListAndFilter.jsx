import React, {useCallback, useEffect, useState} from 'react';
import TasksFilter from "../../task-defition/TasksFilter.jsx";
import {Button, Col, Row} from "react-bootstrap";
import styles from "../gantt-chart/GanttChart.module.css";
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";
import {fetchSubTaskThunk} from "../../../store/subTask_thunk.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasksThunk, tasksListState} from "../../../store/task_thunk.js";
import {fetchAllMembersThunk, memberState} from "../../../store/member.js";
import {taskFilterState} from "../../../store/period_filter_task.js";

const TasksListAndFilter = ({setSelectedTask}) => {

    const { tasksList } = useSelector(tasksListState);
    const {membersList} = useSelector(memberState);
    const formData = useSelector(taskFilterState);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        dispatch(fetchTasksThunk({ pageNumber, formData }));
    }, [pageNumber]);

    useEffect(() => {
        dispatch(fetchAllMembersThunk());
    }, []);

    const getUserName = (username) => {
        const user = membersList.find(member => member.user_name === username);

        return user ? `${user.first_name} ${user.last_name}` : "نام کاربر نامشخص";
    };

    const handleShowGanttChart = useCallback((taskId) => {
        setMessage('چند ثانیه طول می کشد، لطفا صبور باشید.');
        setTimeout(() => {
            setMessage('');
        }, 5000);
        const targetTask = tasksList.find(task => task.id === taskId);
        if (targetTask) {
            setSelectedTask({ task: targetTask, subTasks: [] });
            dispatch(fetchSubTaskThunk(taskId));
        }
    }, [tasksList, dispatch]);

    const handleIncrementPageNumber = () => {
        setPageNumber(pageNumber + 1);
    }

    const handleDecrementPageNumber = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <>
            <TasksFilter />

            <Row className={'g-2'}>
                <Col xs={12} className={'d-flex justify-content-center'}><span className={styles['message']}>{message}</span></Col>
                {tasksList.length > 0 && tasksList.map(taskList => (
                    <Col xs={6} key={taskList.id}>
                        <div onClick={() => { handleShowGanttChart(taskList.id) }} className={styles['tasks_item_contents']}>
                            <span>{taskList.task_title}</span>
                            <span> - </span>
                            <span>{taskList.startDate}</span>
                            <span> تا </span>
                            <span>{taskList.endDate}</span>
                            <span> - </span>
                            <span>{getUserName(taskList.expert)}</span>
                        </div>
                    </Col>
                ))}

                <Col xs={12} className={'d-flex justify-content-center'}>
                    <Button className={'button_form'} onClick={handleIncrementPageNumber} disabled={tasksList.length < 10}>
                        <ChevronRight size={20} />
                    </Button>
                    <span className={styles['page_number']}>{pageNumber}</span>
                    <Button className={'button_form'} onClick={handleDecrementPageNumber} disabled={pageNumber === 1}>
                        <ChevronLeft size={20} />
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default TasksListAndFilter;
