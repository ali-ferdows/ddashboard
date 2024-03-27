import React, {useEffect, useState} from 'react';
import styles from './GanttChart.module.css';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import TasksFilter from "../task-defition/TasksFilter.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasksThunk, tasksListState} from "../../store/task_thunk.js";
import {pageNumberTasksState} from "../../store/page_number_tasks.js";
import {taskFilterState} from "../../store/period_filter_task.js";
import {Col, Row} from "react-bootstrap";
import {fetchSubTaskThunk, subTasksState} from "../../store/subTask_thunk.js";
import moment from "jalali-moment";

const GanttChart = () => {

    const [tasks, setTasks] = useState([]);
    const [clickState, setClickState] = useState(0);
    const [selectedTask, setSelectedTask] = useState([]);
    const { subTasksList } = useSelector(subTasksState);
    const { tasksList } = useSelector(tasksListState);
    const dispatch = useDispatch();
    const pageNumber = useSelector(pageNumberTasksState);
    const formData = useSelector(taskFilterState);

    useEffect(() => {
        dispatch(fetchTasksThunk({pageNumber, formData}));
    }, [pageNumber]);

    const handleShowGanttChart = (taskId) => {
        const targetTask = tasksList.find(task => task.id === taskId);
        if (targetTask) {
            setSelectedTask(targetTask);
            dispatch(fetchSubTaskThunk(taskId));
            setClickState(clickState + 1);
        }
    }

    useEffect(() => {
        const formattedTasks = [];

        if (selectedTask && subTasksList.length > 0) {
            const taskWithSubTasks = {
                ...selectedTask,
                subTasks: subTasksList
            };
            setSelectedTask(taskWithSubTasks);
        }

        if (clickState > 0 && selectedTask.subTasks) {
            // سایر عملیات برای ایجاد formattedTasks
            selectedTask.subTasks.forEach((subTask, index) => {
                formattedTasks.push({
                    start: new Date(moment.from(subTask.startDate, 'fa', 'YYYY/M/D').format('YYYY'), 5, 3),
                    end: new Date(moment.from(subTask.endDate, 'fa', 'YYYY/M/D').format('YYYY'), 10, 3),
                    name: subTask.subTaskTitle,
                    id: "Task " + subTask.id,
                    progress: 0,
                    dependencies: ["Task " + subTask.parentTaskId],
                    type: "task",
                    project: selectedTask.task_title, // اضافه کردن والد تسک
                    displayOrder: index,
                });
            });

            // اضافه کردن تسک پرنت به زیرتسک‌ها
            formattedTasks.unshift({
                start: new Date(moment.from(selectedTask.startDate, 'fa', 'YYYY/M/D').format('YYYY'), 2, 25),
                end: new Date(moment.from(selectedTask.endDate, 'fa', 'YYYY/M/D').format('YYYY'), 5, 3),
                name: selectedTask.task_title,
                id: "task " + selectedTask.id,
                type: "project",
                progress: 0,
                hideChildren: false,
                project: selectedTask.task_title,
                displayOrder: 1,
            });

            console.log(formattedTasks);

            setTasks(formattedTasks);
            setClickState(0);

        }
    }, [subTasksList, clickState]);

    const options = {
        // تنظیمات گانت
        stylingOptions: {
            listCellWidth: '' // غیرفعال کردن قسمت TaskListTable
        }
    };

    return (
        <div>
            <h1 className={'header_titr'}>نمودار گانت</h1>

            <TasksFilter />

            <Row className={'g-2'}>
            {tasksList.length > 0 && tasksList.map(taskList => (
                <Col xs={12} key={taskList.id}>
                    <div onClick={() => {handleShowGanttChart(taskList.id)}}>
                        <span>{taskList.task_title}</span>
                    </div>
                </Col>
            ))}
            </Row>

            {tasks.length > 0 && (
                <Gantt tasks={tasks} options={options} />
            )}

        </div>
    );
};

export default GanttChart;
