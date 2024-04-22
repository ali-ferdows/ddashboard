import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";
import {NotFoundPage} from "../../pages/index.js";
import {editTaskThunk, fetchSingleTaskThunk} from "../../store/task_thunk.js";
import {Button, Form} from "react-bootstrap";
import Deadline from "../deadline/DeadLine.jsx";
import {Loading} from "../index.js";
import {endDataState, startDateState} from "../../store/deadlin.js";
import {NavLink} from "react-router-dom";

const EditTask = () => {

    const {taskId} = useParams();
    const {taskItem, loading, error} = useSelector((state) => state.tasksList);
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();
    const [taskEdited, setTaskEdited] = useState({});
    const startDate = useSelector(startDateState);
    const endDate = useSelector(endDataState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    if (isNaN(parseInt(taskId)) || error) {
        return <NotFoundPage />;
    }

    useEffect(() => {
        dispatch(fetchSingleTaskThunk(taskId));
        dispatch(fetchAllMembersThunk());
    }, [taskId]);

    useEffect(() => {
        setTaskEdited({
            task_title : taskItem.task_title,
            estimated_time : taskItem.estimated_time,
            priority : taskItem.priority,
            startDate : taskItem.startDate,
            endDate : taskItem.endDate,
            expert : taskItem.expert,
            status : taskItem.status,
            description : taskItem.description,
            is_deleted: taskItem.is_deleted
        })
    }, [taskItem]);

    if (taskEdited.is_deleted) {
        return (
            <>
                <h1 className={'header_titr'}>ویرایش تسک « {taskItem.task_title} »</h1>

                <h3 className="error_message">این تسک حذف شده است.</h3>

                <NavLink to={'/tasks-list'} className={'d-block text-primary-emphasis text-center p-4 shadow'}>بازگشت به لیست تسک ها</NavLink>
            </>
        )
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setTaskEdited(prevState => ({...prevState, [name] : value}));
    }

    const handleSubmitTaskForm = async (e) => {
        e.preventDefault();

        if (startDate) {
            setTaskEdited(taskEdited.startDate = startDate);
        }
        if (endDate) {
            setTaskEdited(taskEdited.endDate = endDate);
        }

        const result = await dispatch(editTaskThunk({taskEdited, taskId}));
        if (result.meta.requestStatus === "fulfilled") {
            setSuccessMessage('عالی! اطلاعات این تسک با موفقیت ویرایش شد.');
            setErrorMessage("");
        }else{
            setErrorMessage("ویرایش اطلاعات با مشکل مواجه گردید. لطفا بعدا مجدد تلاش نمایید.");
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <h1 className={'header_titr'}>ویرایش تسک « {taskItem.task_title} »</h1>

            {errorMessage && (
                <h3 className={'error_message'}>{errorMessage}</h3>
            )}

            {successMessage && (
                <h3 className={'success_message'}>{successMessage}</h3>
            )}

            {loading ? (
                <Loading />
            ) : (
                <Form onSubmit={handleSubmitTaskForm}>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'task_title'}>عنوان تسک : </Form.Label>
                        <Form.Control type={'text'} id={'task_title'} name={'task_title'} value={taskEdited.task_title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'estimated_time'}>زمان تخمینی : </Form.Label>
                        <Form.Control type={'number'} id={'estimated_time'} name={'estimated_time'} value={taskEdited.estimated_time} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'priority'}>اولویت : </Form.Label> <span>{taskEdited.priority}</span>
                        <Form.Control type={'range'} id={'priority'} min={1} max={10} name={'priority'} value={taskEdited.priority} onChange={handleChange} />
                    </Form.Group>

                    <div>
                        <span>تاریخ شروع : {taskEdited.startDate}</span>
                        <span> - </span>
                        <span>تاریخ پایان : {taskEdited.endDate}</span>
                    </div>

                    <Deadline />

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'expert'}>کارشناس مجری : </Form.Label>
                        <Form.Select
                            aria-label="Select expert"
                            id={'expert'}
                            onChange={handleChange}
                            name={'expert'}
                            multiple={false}
                        >
                            <option value="0" disabled={true}>انتخاب نمایید ...</option>
                            {membersList.map(member => (
                                <option key={member.id} value={member.user_name} selected={member.user_name === taskEdited.expert ? true : false}>{member.first_name} {member.last_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'status'}>وضعیت : </Form.Label>
                        <Form.Select
                            id={'status'}
                            name={'status'}
                            onChange={handleChange}
                        >
                            <option value="0" disabled={true}>انتخاب کنید ...</option>
                            <option value="not_started" selected={taskEdited.status === 'not_started' ? true : false}>شروع نشده</option>
                            <option value="waiting" selected={taskEdited.status === 'waiting' ? true : false}>در انتظار</option>
                            <option value="doing" selected={taskEdited.status === 'doing' ? true : false}>در حال انجام</option>
                            <option value="completed" selected={taskEdited.status === 'completed' ? true : false}>تکمیل شده</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'attachment'}>فایل های پیوست : </Form.Label>
                        <Form.Control type={'file'}  multiple />
                        <Form.Text className="text-muted">این بخش در آینده قابل توسعه است.</Form.Text>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'description'}>توضیحات : </Form.Label>
                        <Form.Control as={'textarea'} id={'description'} rows={5} name={'description'} value={taskEdited.description} onChange={handleChange} />
                    </Form.Group>

                    <Button type={'submit'} className={'button_form'}>ویرایش</Button>
                </Form>
            )}
        </div>
    );
};

export default EditTask;
