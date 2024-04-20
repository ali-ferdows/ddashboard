// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import styles from './SessionList.module.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment-jalaali";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteSessionThunk, doneSessionThunk, fetchSessionListThunk} from "../../store/fetchSessionList.js";
import {Loading} from "../index.js";
import {Table} from "react-bootstrap";
import {CheckCircleFill, PencilSquare, Trash3Fill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const SessionList = () => {

    const localizer = momentLocalizer(moment);
    let {sessionList, loading, error} = useSelector(state => state.sessionList);
    const dispatch = useDispatch();
    const [forceUpdateKey, setForceUpdateKey] = useState(0);
    const nowDate = moment().format('jYYYY/jM/jD');
    const navigate = useNavigate();
    sessionList = sessionList.filter(session => {
        const isAfterToday = session.session_date >= nowDate;
        return isAfterToday;
    });

    useEffect(() => {
        dispatch(fetchSessionListThunk());
    }, [forceUpdateKey]);

  if (loading) {
    return (<Loading />);
  }

  if (error) {
    return (
        <div>

            <h1 className={'header_titr'}>لیست جلسات</h1>

            <h3 className={"error_message"}>
                <p>خطایی در حین پردازش رخ داده است. لطفا با پشتیبانی نرم افزار تماس بگیرید.</p>
            </h3>
        </div>
    );
  }

  const events = sessionList.map((session) => {
    const start = moment(session.session_date + ' ' + session.session_time, 'jYYYY/jMM/jDD HH:mm').toDate();
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);


      return {
      title: session.session_title,
      start,
      end,
    };
  });

    const handleDeleteSession = (sessionId) => {
        const isConfirmed = window.confirm('آیا مطمئنید که می‌خواهید این جلسه را حذف کنید؟');

        if (isConfirmed) {
            dispatch(deleteSessionThunk(sessionId));
            setForceUpdateKey((prevKey) => prevKey + 1);
        }
    };

    const handleDoneSession = (sessionId) => {
        const isConfirmed = window.confirm('این جلسه به لیست جلسات برگزار شده افزوده خواهد شد. آیا مطمئن هستید؟');

        if (isConfirmed) {
            const sessionToUpdate = sessionList.find(session => session.id === sessionId);
            if (sessionToUpdate) {
                const updatedSession = { ...sessionToUpdate, isDone: true };
                dispatch(doneSessionThunk({ sessionItem: updatedSession, sessionId }));
                navigate('/feedback');
            }
        }
    }


    return (
        <div>

            <h1 className={'header_titr'}>لیست جلسات</h1>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, marginBottom: 30 }}
            />

            <Table border={2} hover={true} responsive={true}>
                <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>عنوان جلسه</th>
                        <th>تاریخ و ساعت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                {sessionList.map((session, index) => {
                    const isDone = session.isDone;
                    const isToday = session.session_date === nowDate;

                    return !isDone && (
                        <tr key={session.id}>
                            <td>
                    <span className={isToday ? styles['alarm'] : styles['no_alarm']}>
                        {index + 1}
                    </span>
                            </td>
                            <td>{session.session_title}</td>
                            <td>{`${session.session_date} - ${session.session_time}`}</td>
                            <td className={styles['action']}>
                                {isToday ? (
                                    <CheckCircleFill size={20} onClick={() => handleDoneSession(session.id)} title={'برگزار شد'} />
                                ) : (
                                    <>
                                        <Link to={`/edit-session/${session.id}`} title={'ویرایش'}>
                                            <PencilSquare size={20} />
                                        </Link>
                                    </>
                                )}
                                <Trash3Fill size={20} onClick={() => handleDeleteSession(session.id)} title={'حذف'} />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default SessionList;
