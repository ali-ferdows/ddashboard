/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {PersonFillX} from "react-bootstrap-icons";
import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteEmailExpert} from "../../store/guest_experts.js";

const TableOfEmails = () => {

    const selectedExperts = useSelector(state => state.InvitedExperts.selectedExperts);
    const dispatch = useDispatch();
    const handleDeleteEmail = (email) => {
        dispatch(deleteEmailExpert(email));
    };

    return (
        <>
            <Table striped hover={true} responsive={true}>
                <tbody>
                {selectedExperts.map((item, index) => (
                    <tr key={index}>
                        <td>
                            {item}
                        </td>
                        <td>
                            <PersonFillX size={20} onClick={() => handleDeleteEmail({item})} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default TableOfEmails;
