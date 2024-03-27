/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import styles from './ApprovalsPM.module.css';
import {Button, ListGroup, Modal} from "react-bootstrap";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function ModalShowApproval(props) {

    if (!props.approvalData) {
        return null;
    }

    const { name, date, resolutions } = props.approvalData;

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>فیدبک ماهیانه</span><span> - </span><span>{name}</span><span> - </span><span>{date}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup as="ol" numbered>
                    {resolutions.map((resolution, index) => (
                        <ListGroup.Item key={index} as="li">{resolution}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className={'button_form'}>بستن</Button>
            </Modal.Footer>
        </Modal>
    );
}


const ApprovalsPM = () => {
    const [modalShow, setModalShow] = useState(false);
    const [selectedApprovalData, setSelectedApprovalData] = useState(null);
    const [approvalsData] = useState([
        { name: 'حسین حسینی', date: '1402/09/20', resolutions: ['مصوبه شماره یک', 'مصوبه شماره دو', 'مصوبه شماره سه'] },
        { name: 'امیر امیری', date: '1402/09/23', resolutions: ['مصوبه شماره یک', 'مصوبه شماره دو','مصوبه شماره سه', 'مصوبه شماره چهار'] },
        { name: 'رضا رضایی', date: '1402/09/25', resolutions: ['مصوبه شماره یک', 'مصوبه شماره دو','مصوبه شماره سه'] },
        { name: 'حسن حسنی', date: '1402/09/29', resolutions: ['مصوبه شماره یک', 'مصوبه شماره دو','مصوبه شماره سه', 'مصوبه شماره چهار'] },
    ]);

    const data = {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        datasets: [{
            label: 'Life expectancy',
            data: [5, 6, 3, 7, 5 ,5 , 4],
            borderColor: 'rgb(99,255,190)',
            backgroundColor: 'rgba(99,255,213,0.5)',
            borderWidth: 2
        }]
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
                    }
                }
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    return (
        <div className={`${styles['approvalsPM_contents']} homepage_boxes_container d-flex flex-row flex-wrap`}>
            <header className={'w-100'}>
                <h3>مصوبات جلسات گذشته</h3>
            </header>


            <Line data={data} options={options} />


            {approvalsData.map((data, index) => (
                <div key={index} className={`${styles['approvalsPM_content']} my-1`}>
                    <div onClick={() => { setModalShow(true); setSelectedApprovalData(data); }}>
                        <span>فیدبک ماهیانه</span><span> - </span><span>{data.name}</span><span> - </span><span>{data.date}</span>
                    </div>
                </div>
            ))}

            <ModalShowApproval
                show={modalShow}
                onHide={() => { setModalShow(false); setSelectedApprovalData(null); }}
                approvalData={selectedApprovalData}
            />
        </div>
    );
};

export default ApprovalsPM;
