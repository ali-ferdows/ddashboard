/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Table } from "react-bootstrap";

const TableOfEmails = ({ emailList }) => {

    if (emailList && emailList.length > 0) {
        const emailsArray = emailList.split(',');

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
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </>
        );
    }
};

export default TableOfEmails;
