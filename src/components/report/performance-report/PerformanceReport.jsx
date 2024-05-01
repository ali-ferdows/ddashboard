import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksThunk, tasksListState } from "../../../store/task_thunk.js";
import {fetchSubTaskMemberThunk, subTasksState} from "../../../store/subTask_thunk.js";
import _ from "lodash";
import {Button} from "react-bootstrap";
import {fetchAllMembersThunk, memberState} from "../../../store/member.js";
import LineChartPerformance from "./LineChartPerformance.jsx";
import BarChartPerformance from "./BarChartPerformance.jsx";

const PerformanceReport = () => {
    const [completedTasksList, setCompletedTasksList] = useState([]);
    const [completedSubTasksList, setCompletedSubTasksList] = useState([]);
    const { tasksList } = useSelector(tasksListState);
    const { subTasksList } = useSelector(subTasksState);
    const [mergedCounts, setMergedCounts] = useState({});
    const [lineChart, setLineChart] = useState(false);
    const [barChart, setBarChart] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const formData = {
            task_title: '',
            from_date: '',
            to_date: '',
            expert: '',
            status: 'completed'
        };

        dispatch(fetchTasksThunk({ pageNumber: '', formData }));
        dispatch(fetchSubTaskMemberThunk({ subTaskExpert: '', subTaskStartDate: '', subTaskEndDate: '', subTaskStatus: 'completed' }));
        dispatch(fetchAllMembersThunk());
    }, []);

    useEffect(() => {
        setCompletedTasksList(tasksList);
        setCompletedSubTasksList(subTasksList);
    }, [tasksList, subTasksList]);

    useEffect(() => {
        if (completedTasksList.length > 0 || completedSubTasksList.length > 0) {
            const tasksExpertCounts = _.countBy(completedTasksList, 'expert');
            const subTasksExpertCounts = _.countBy(completedSubTasksList, 'subTaskExpert');

            const mergedCountsObj = _.mergeWith(tasksExpertCounts, subTasksExpertCounts, (objValue, srcValue) => {
                if (_.isNumber(objValue) && _.isNumber(srcValue)) {
                    return objValue + srcValue;
                }
            });
            setMergedCounts(mergedCountsObj);


        }
    }, [completedTasksList, completedSubTasksList]);

    const handleLineChart = () => {
        setBarChart(false);
        setLineChart(true);
    }

    const handleBarChart = () => {
        setLineChart(false);
        setBarChart(true);
    }

    return (
        <>
            <h1 className={'header_titr'}>گزارش عملکرد اعضا</h1>

            <div className={'d-flex align-content-center justify-content-center'}>
                <Button className={'button_form mx-2'} type={"button"} onClick={handleLineChart}>نمودار خطی</Button>
                <Button className={'button_form mx-2'} type={"button"} onClick={handleBarChart}>نمودار میله ای</Button>
            </div>

            {lineChart && (<LineChartPerformance mergedCounts={mergedCounts} />)}
            {barChart && (<BarChartPerformance mergedCounts={mergedCounts} />)}

        </>
    );
};

export default PerformanceReport;