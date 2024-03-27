/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectDate, setDate} from "../../store/selected_session_date.js";
import Calendar from 'react-bootstrap-jalali-calendar/dist/calendar';
import {Button, Modal} from "react-bootstrap";
import {selectFormData, setFormData} from "../../store/form_data.js";

export const ModalShowDate = (props) => {
    const dispatch = useDispatch();
    const date = useSelector(selectDate);
    const formData = useSelector(selectFormData);
    const selectedExperts = useSelector(state => state.InvitedExperts.selectedExperts);

    const options = {
        hideTodayButton: false,
        stopChangingYears: false,
        calendarHeaderColor: "secondary",
        hideToolsBar: false,
        calendarToolsColor: "light",
    }

    const selectedDate = (day) => {
        dispatch(setDate(day.date));

        dispatch(setFormData({
            ...formData,
            session_date: day.date,
        }));
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">انتخاب تاریخ</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'selected_date_modal'}>
                <Calendar callback={selectedDate} value={date} options={options}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className={'button_form'}>بستن</Button>
            </Modal.Footer>
        </Modal>
    );
}