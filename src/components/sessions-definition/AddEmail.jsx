/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react';
import {Form} from "react-bootstrap";
import styles from "./SessionsDefinition.module.css";
import {PersonPlus} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedExperts} from "../../store/guest_experts.js";

const AddEmail = () => {

    const selectedExperts = useSelector(state => state.InvitedExperts.selectedExperts);
    const dispatch = useDispatch();
    const [newEmail, setNewEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleAddEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(newEmail);

        if (newEmail && isEmailValid) {
            if (!selectedExperts.includes(newEmail)) {
                dispatch(setSelectedExperts([...selectedExperts, newEmail]));
            }
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    return (
        <>
            <Form.Control
                type="email"
                className={styles['email_other_guests']}
                placeholder="ایمیل سایر مهمانان"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                isInvalid={!isValidEmail}
            />
            <Form.Control.Feedback type="invalid" className={styles['feedback_message']}>
                فرمت ایمیل نامعتبر است.
            </Form.Control.Feedback>
            <PersonPlus size={25} onClick={handleAddEmail} />
        </>
    );
};

export default AddEmail;
