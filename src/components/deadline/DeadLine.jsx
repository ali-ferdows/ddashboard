import React, {useState} from 'react';
import moment from "moment-jalaali";
import Calendar from 'react-bootstrap-jalali-calendar/dist/calendar';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import {endDataState, setEndDate, setStartDate, startDateState} from "../../store/deadlin.js";

const DeadLine = () => {

    const startDate = useSelector(startDateState);
    const endDate = useSelector(endDataState);
    const [startDateShow, setStartDateShow] = useState(false);
    const [endDateShow, setEndDateShow] = useState(false);
    const date = moment().format('jYYYY/jM/jD');
    const dispatch = useDispatch();

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
        dispatch(setStartDate(selectedDate));
        handleStartDateClose();
    };

    const handleEndDateChange = (day) => {
        const selectedDate = day.date;
        dispatch(setEndDate(selectedDate));
        handleEndDateClose();
    };

    return (
        <>
            <Form.Group className={'form_group'}>
                <Form.Label htmlFor={'deadline'}>مهلت : </Form.Label>
                <Form.Control type={'text'} id={'startDeadline'} placeholder="تاریخ شروع (yyyy/mm/dd)" value={startDate} name={'startDeadline'} onClick={handleStartDateShow} />
                <Form.Control type={'text'} id={'endDeadline'} placeholder="تاریخ پایان (yyyy/mm/dd)" value={endDate} name={'endDeadline'} onClick={handleEndDateShow} />
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

export default DeadLine;
