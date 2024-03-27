import React, {useState, useEffect, useCallback, useRef} from 'react';
import styles from './GanttChart.module.css';
import TasksFilter from "../task-defition/TasksFilter.jsx";
import {Button, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasksThunk, tasksListState} from "../../store/task_thunk.js";
import {pageNumberTasksState} from "../../store/page_number_tasks.js";
import {taskFilterState} from "../../store/period_filter_task.js";
import {fetchSubTaskThunk, subTasksState} from "../../store/subTask_thunk.js";
import moment from "jalali-moment";
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";

const GanttChart = () => {
    const { tasksList } = useSelector(tasksListState);
    const { subTasksList } = useSelector(subTasksState);
    const [selectedTask, setSelectedTask] = useState({ task: {}, subTasks: [] });
    const [formattedTasks, setFormattedTasks] = useState([]);
    const [message, setMessage] = useState("");
    const pageNumber = useSelector(pageNumberTasksState);
    const formData = useSelector(taskFilterState);
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();

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

    useEffect(() => {
        setSelectedTask(prevTasks => ({ ...prevTasks, subTasks: subTasksList }));
    }, [subTasksList]);

    useEffect(() => {
        const tasksArray = [];
        if (selectedTask.subTasks.length > 0) {
            selectedTask.subTasks.forEach((subTask, index) => {
                tasksArray.push({
                    start: new Date(moment.from(subTask.subTaskStartDate, 'fa', 'YYYY/M/D').format('YYYY'), moment.from(subTask.subTaskStartDate, 'fa', 'YYYY/M/D').format('M'), moment.from(subTask.subTaskStartDate, 'fa', 'YYYY/M/D').format('D')),
                    end: new Date(moment.from(subTask.subTaskEndDate, 'fa', 'YYYY/M/D').format('YYYY'), moment.from(subTask.subTaskEndDate, 'fa', 'YYYY/M/D').format('M'), moment.from(subTask.subTaskEndDate, 'fa', 'YYYY/M/D').format('D')),
                    name: subTask.subTaskTitle,
                    id: "Task " + subTask.id,
                    progress: 0,
                    dependencies: ["Task " + subTask.parentTaskId],
                    type: "task",
                    project: selectedTask.task.task_title,
                    displayOrder: index,
                });
            });
        }

        tasksArray.unshift({
            start: new Date(moment.from(selectedTask.task.startDate, 'fa', 'YYYY/M/D').format('YYYY'), moment.from(selectedTask.task.startDate, 'fa', 'YYYY/M/D').format('M'), moment.from(selectedTask.task.startDate, 'fa', 'YYYY/M/D').format('D')),
            end: new Date(moment.from(selectedTask.task.endDate, 'fa', 'YYYY/M/D').format('YYYY'), moment.from(selectedTask.task.endDate, 'fa', 'YYYY/M/D').format('M'), moment.from(selectedTask.task.endDate, 'fa', 'YYYY/M/D').format('D')),
            name: selectedTask.task.task_title,
            id: "Task " + selectedTask.task.id,
            type: "project",
            progress: 0,
            hideChildren: false,
            project: selectedTask.task.task_title,
            displayOrder: 1,
        });
        setFormattedTasks(tasksArray);
    }, [selectedTask]);

    return (
        <div>
            <h1 className={'header_titr'}>نمودار گانت</h1>

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

                <Col xs={12}>
                    {formattedTasks.length > 0 && (
                        <Gantt
                            tasks={formattedTasks}
                            viewMode={ViewMode.Month}
                            listCellWidth={""}
                            columnWidth={200}
                            ganttHeight={200}
                        />
                    )}
                </Col>

            </Row>
        </div>
    );
};

export default GanttChart;
