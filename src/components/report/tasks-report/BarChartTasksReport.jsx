import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChartTasksReport = ({taskCounts, subTaskCounts}) => {

    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalDoing, setTotalDoing] = useState(0);
    const [totalWaiting, setTotalWaiting] = useState(0);
    const [totalNotStarted, setTotalNotStarted] = useState(0);

    useEffect(() => {

        setTotalCompleted(taskCounts['completed'] + subTaskCounts['completed']);
        setTotalDoing(taskCounts['doing'] + subTaskCounts['doing']);
        setTotalWaiting(taskCounts['waiting'] + subTaskCounts['waiting']);
        setTotalNotStarted(taskCounts['not_started'] + subTaskCounts['not_started']);

    }, [taskCounts, subTaskCounts]);

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

    const labels = ['انجام شده', 'در حال انجام', 'در انتظار', 'شروع نشده'];

    const data = {
        labels,
        datasets: [
            {
                label: 'تعداد تسک ها',
                data: [totalCompleted, totalDoing, totalWaiting, totalNotStarted],
                backgroundColor: 'rgb(149,99,190)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}

export default BarChartTasksReport;