import React, {useState} from 'react';
import styles from './TasksFilter.module.css';
import {Button, Form, Modal} from "react-bootstrap";
import moment from "moment-jalaali";
import {useDispatch, useSelector} from "react-redux";
import {setTaskFilterForm, taskFilterState} from "../../store/period_filter_task.js";
import Calendar from 'react-bootstrap-jalali-calendar/dist/calendar';

const PeriodFilter = () => {

    const date = moment().format('jYYYY/jM/jD');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDateShow, setStartDateShow] = useState(false);
    const [endDateShow, setEndDateShow] = useState(false);
    const dispatch = useDispatch();
    const formData = useSelector(taskFilterState);

    const options = {
        hideTodayButton: false,
        stopChangingYears: false,
        calendarHeaderColor: "secondary",
        hideToolsBar: false,
        calendarToolsColor: "light",
    }

    const handleStartDateClose = () => setStartDateShow(false);
    const handleStartDateShow = () => setStartDateShow(true);

    const handleEndDateClose = () => setEndDateShow(false);
    const handleEndDateShow = () => setEndDateShow(true);

    const handleStartDateChange = (day) => {
        const selectedDate = day.date;
        setStartDate(selectedDate);
        dispatch(setTaskFilterForm({...formData , from_date : selectedDate}));
        handleStartDateClose();
    };

    const handleEndDateChange = (day) => {
        const selectedDate = day.date;
        setEndDate(selectedDate);
        dispatch(setTaskFilterForm({...formData , to_date : selectedDate}));
        handleEndDateClose();
    };

    return (
        <>
            <Form.Group className={`form_group ${styles['period']}`}>
                <Form.Label htmlFor={'from'}>از : </Form.Label>
                <Form.Control type={'text'} id={'from'} placeholder="تاریخ شروع (yyyy/mm/dd)" value={startDate} name={'startDeadline'} onClick={handleStartDateShow} />
                <Form.Label htmlFor={'to'}>تا : </Form.Label>
                <Form.Control type={'text'} id={'to'} placeholder="تاریخ پایان (yyyy/mm/dd)" value={endDate} name={'endDeadline'} onClick={handleEndDateShow} />
            </Form.Group>

            <Modal show={startDateShow} onHide={handleStartDateClose}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">انتخاب تاریخ</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'selected_date_modal'}>
                    <Calendar callback={handleStartDateChange} value={date} options={options}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleStartDateClose} className={'button_form'}>بستن</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={endDateShow} onHide={handleEndDateClose}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">انتخاب تاریخ</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'selected_date_modal'}>
                    <Calendar callback={handleEndDateChange} value={date} options={options}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEndDateClose} className={'button_form'}>بستن</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PeriodFilter;
