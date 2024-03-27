// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import styles from './MemberInformation.module.css';
import {Button, Table} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteMemberThunk, fetchAllMembersThunk, memberState} from "../../store/member.js";
import {Loading} from "../index.js";
import {PencilSquare, Trash3Fill} from "react-bootstrap-icons";

const MemberInformation = () => {
    const [forceUpdateKey, setForceUpdateKey] = useState(0);
    const {membersList, loading, error} = useSelector(memberState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllMembersThunk())
    }, [forceUpdateKey]);

    const handleDeleteMember = (memberId) => {
        const isConfirmed = window.confirm('آیا مطمئنید که می‌خواهید این کاربر را حذف کنید؟');

        if (isConfirmed) {
            dispatch(deleteMemberThunk(memberId));
            setForceUpdateKey((prevKey) => prevKey + 1);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div>

                <h1 className={'header_titr'}>اطلاعات اعضا</h1>

                <div className={styles['error_message']}>
                    <p>خطایی در حین پردازش رخ داده است. لطفا با پشتیبانی نرم افزار تماس بگیرید.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={'header_titr'}>اطلاعات اعضا</h1>

            <NavLink to={'/add-member'} className={styles['button_add_member']}>
                <Button type={"button"} className={'button_form'}>افزودن عضو جدید</Button>
            </NavLink>

            {membersList.length > 0 ? (
                <Table striped hover={true} bordered={true} responsive={true} className={styles['table_member_list']}>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>کد ملی</th>
                        <th>ایمیل</th>
                        <th>تاریخ تولد</th>
                        <th>نام کاربری</th>
                        <th>جنسیت</th>
                        <th>عملیات (حذف / ویرایش)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {membersList.map((member, index) => (
                        <tr key={member.id}>
                            <td>{index + 1}</td>
                            <td>{member.first_name}</td>
                            <td>{member.last_name}</td>
                            <td>{member.user_id}</td>
                            <td>{member.email}</td>
                            <td>{member.birthday}</td>
                            <td>{member.user_name}</td>
                            <td>{member.gender === "male" ? "مرد" : "زن"}</td>
                            <td className={styles['action']}>
                                <Link to={`/edit-member/${member.id}`} title={'ویرایش'}>
                                    <PencilSquare size={20} />
                                </Link>
                                <Trash3Fill size={20} onClick={() => handleDeleteMember(member.id)} title={'حذف'} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p className={styles['error_message']}>
                    اطلاعاتی برای نمایش وجود ندارد.
                </p>
            )}

        </div>
    );
};

export default MemberInformation;
