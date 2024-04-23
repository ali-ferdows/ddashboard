import React, {useEffect, useState} from 'react';
import styles from './ProjectProgressReport.module.css';
import TasksListAndFilter from "../common/TasksListAndFilter.jsx";
import {useSelector} from "react-redux";
import {subTasksState} from "../../../store/subTask_thunk.js";
import {Table} from "react-bootstrap";

const ProjectProgressReport = () => {

    const { subTasksList } = useSelector(subTasksState);
    const [selectedTask, setSelectedTask] = useState({ task: {}, subTasks: [] });

    useEffect(() => {
        setSelectedTask(prevTasks => ({ ...prevTasks, subTasks: subTasksList }));
    }, [subTasksList]);

    console.log(selectedTask);

    return (
        <>
            <h1 className={'header_titr'}>گزارش پیشرفت پروژه</h1>

            <TasksListAndFilter setSelectedTask={setSelectedTask} />

            {selectedTask.task.id && (
                <Table striped border={2} hover={true} responsive={true} className={'table my-5'}>
                    <thead>
                        <tr>
                            <th>تکمیل شده</th>
                            <th>در حال انجام</th>
                            <th>در انتظار</th>
                            <th>شروع نشده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            )}
            
        </>
    );
};

export default ProjectProgressReport;
