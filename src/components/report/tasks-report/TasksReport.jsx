import React, {useEffect, useState} from 'react';
import TaskFilterByUserName from "../common/TaskFilterByUserName.jsx";
import {useSelector} from "react-redux";
import _ from "lodash";
import BarChartTasksReport from "./BarChartTasksReport.jsx";


const TasksReport = () => {

    const { theMemberTasksList } = useSelector(state => state.theMemberTasks);
    const { theMemberSubTasksList } = useSelector(state => state.theMemberTasks);
    const [taskCounts, setTaskCounts] = useState({ completed: 0, doing: 0, waiting: 0, not_started: 0 });
    const [subTaskCounts, setSubTaskCounts] = useState({ completed: 0, doing: 0, waiting: 0 });

    useEffect(() => {
    if (theMemberTasksList.length > 0 && theMemberSubTasksList.length > 0) {
        const tasksStatusCounts = _.countBy(theMemberTasksList, 'status');
        const subTasksStatusCounts = _.countBy(theMemberSubTasksList, 'subTaskStatus');

        setTaskCounts({
            completed: tasksStatusCounts.completed || 0,
            doing: tasksStatusCounts.doing || 0,
            waiting: tasksStatusCounts.waiting || 0,
            not_started: tasksStatusCounts.not_started || 0
        });

        setSubTaskCounts({
            completed: subTasksStatusCounts.completed || 0,
            doing: subTasksStatusCounts.doing || 0,
            waiting: subTasksStatusCounts.waiting || 0,
            not_started: subTasksStatusCounts.not_started || 0
        });

    }

}, [theMemberTasksList, theMemberSubTasksList]);


    return (
        <>

            <h1 className={'header_titr'}>گزارش تسک ها</h1>

            <TaskFilterByUserName />

            {theMemberTasksList.length > 0 && (
                <BarChartTasksReport taskCounts={taskCounts} subTaskCounts={subTaskCounts} />
            )}

        </>
    );
};

export default TasksReport;
