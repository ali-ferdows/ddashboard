import React, {useState, useEffect} from 'react';
import styles from './GanttChart.module.css';
import {Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import moment from "jalali-moment";
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {subTasksState} from "../../../store/subTask_thunk.js";
import TasksListAndFilter from "../common/TasksListAndFilter.jsx";

const GanttChart = () => {
    const { subTasksList } = useSelector(subTasksState);
    const [selectedTask, setSelectedTask] = useState({ task: {}, subTasks: [] });
    const [formattedTasks, setFormattedTasks] = useState([]);

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

            <TasksListAndFilter setSelectedTask={setSelectedTask} />

            <Row className={'g-2'}>

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
