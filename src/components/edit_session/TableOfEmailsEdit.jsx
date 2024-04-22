/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Table } from "react-bootstrap";
import {Trash3Fill} from "react-bootstrap-icons";

const TableOfEmails = ({setSessionItem, emailList }) => {

    let emailsArray = [];
    if (emailList && emailList.length > 0) {
        emailsArray = emailList.split(',');
    }

    const handleDeleteEmail = (email) => {
        emailsArray = emailsArray.filter(e => e !== email);
        const updatedInvitedExpert = emailsArray.join(",");
        setSessionItem(
            prevState => ({
                    ...prevState,
                    invited_expert: updatedInvitedExpert
            })
        )
    }

    return (
        <>
            <Table striped hover={true} responsive={true}>
                <thead>
                    <tr>
                        <th>ایمیل حاضران</th>
                    </tr>
                </thead>
                <tbody>
                {emailsArray.map((email, index) => (
                    <tr key={index}>
                        <td>{email.trim()}</td>
                        <td><Trash3Fill size={20} onClick={() => handleDeleteEmail(email)} title={'حذف'} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default TableOfEmails;
