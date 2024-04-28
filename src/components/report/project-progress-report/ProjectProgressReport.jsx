import React, {useEffect, useState} from 'react';
import styles from './ProjectProgressReport.module.css';
import TasksListAndFilter from "../common/TasksListAndFilter.jsx";
import {useSelector} from "react-redux";
import {subTasksState} from "../../../store/subTask_thunk.js";
import {Col, Row, Table} from "react-bootstrap";
import _ from 'lodash';
import {Pie} from "react-chartjs-2";
import {
    Chart as ChartJS,
    Tooltip,
    Legend, ArcElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectProgressReport = () => {

    const {subTasksList} = useSelector(subTasksState);
    const [selectedTask, setSelectedTask] = useState({task: {}, subTasks: []});
    const [countStatus, setCountStatus] = useState({completed: 0, doing: 0, waiting: 0, not_started: 0});

    useEffect(() => {
        setSelectedTask(prevTasks => ({...prevTasks, subTasks: subTasksList}));

        if (subTasksList.length === 0) {
            setCountStatus(prevCounts => ({
                completed: selectedTask.task.status === 'completed' ? 1 : 0,
                doing: selectedTask.task.status === 'doing' ? 1 : 0,
                waiting: selectedTask.task.status === 'waiting' ? 1 : 0,
                not_started: selectedTask.task.status === 'not_started' ? 1 : 0
            }));
        } else {
            const groupedSubTasks = _.groupBy(subTasksList, 'subTaskStatus');
            const statusCounts = _.mapValues(groupedSubTasks, 'length');

            setCountStatus(prevCounts => ({
                completed: statusCounts.completed || 0,
                doing: statusCounts.doing || 0,
                waiting: statusCounts.waiting || 0,
                not_started: statusCounts.not_started || 0
            }));
        }

    }, [subTasksList, selectedTask.task]);

    const data = {
        labels: ['تکمیل شده', 'در حال انجام', 'در انتظار', 'شروع نشده'],
        datasets: [
            {
                label: '# of Votes',
                data: [countStatus.completed, countStatus.doing, countStatus.waiting, countStatus.not_started],
                backgroundColor: [
                    'rgba(111, 190, 99, 0.2)',
                    'rgba(149, 99, 190, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 0, 7, 0.2)',
                ],
                borderColor: [
                    'rgba(111, 190, 99, 1)',
                    'rgba(149, 99, 190, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 0, 7, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "IRANSans",
                        size: 14
                    },
                }
            },
        },
    };

    console.log(selectedTask)

    return (
        <>
            <h1 className={'header_titr'}>گزارش پیشرفت پروژه</h1>

            <TasksListAndFilter setSelectedTask={setSelectedTask}/>

            <Row>
                <Col sm={12}>
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
                                <td>{countStatus.completed}</td>
                                <td>{countStatus.doing}</td>
                                <td>{countStatus.waiting}</td>
                                <td>{countStatus.not_started}</td>
                            </tr>
                            </tbody>
                        </Table>
                    )}
                </Col>
                <Col sm={12} className={styles['pie_charts']}>
                    <Pie data={data} options={options}/>
                </Col>
            </Row>

        </>
    );
};

export default ProjectProgressReport;
