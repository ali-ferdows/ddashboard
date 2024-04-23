import React, {useEffect, useState} from 'react';
import {Loading} from "../index.js";
import {Button, Form} from "react-bootstrap";
import Deadline from "../deadline/DeadLine.jsx";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {editSubTaskThunk, fetchSingleSubTask, subTasksState} from "../../store/subTask_thunk.js";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";
import {endDataState, startDateState} from "../../store/deadlin.js";
import {NotFoundPage} from "../../pages/index.js";
import {NavLink} from "react-router-dom";

const EditSubTask = () => {

    const {subTaskId} = useParams();
    const {subTasksList, loading, error} = useSelector(subTasksState);
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();
    const startDate = useSelector(startDateState);
    const endDate = useSelector(endDataState);
    const [subTaskEdited, setSubTaskEdited] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (isNaN(parseInt(subTaskId)) || error) {
        return <NotFoundPage />;
    }

    useEffect(() => {
        dispatch(fetchSingleSubTask(subTaskId));
        dispatch(fetchAllMembersThunk());
    }, [subTaskId]);

    useEffect(() => {
        setSubTaskEdited({
            subTaskParentId : subTasksList.parentTaskId,
            subTaskTitle : subTasksList.subTaskTitle,
            subTaskEstimateTime : subTasksList.subTaskEstimateTime,
            subTaskPriority : subTasksList.subTaskPriority,
            subTaskStartDate : subTasksList.subTaskStartDate,
            subTaskEndDate : subTasksList.subTaskEndDate,
            subTaskExpert : subTasksList.subTaskExpert,
            subTaskStatus : subTasksList.subTaskStatus,
            subTaskDescription : subTasksList.subTaskDescription,
            subTaskIsDeleted : subTasksList.is_deleted
        });
    }, [subTasksList]);

    if (subTaskEdited.subTaskIsDeleted) {
        return (
            <>
                <h1 className={'header_titr'}>ویرایش زیر تسک « {subTasksList.subTaskTitle} »</h1>

                <h3 className="error_message">این زیر تسک حذف شده است.</h3>

                <NavLink to={`/task-info/${subTaskEdited.subTaskParentId}`} className={'d-block text-primary-emphasis text-center p-4 shadow'}>بازگشت به لیست زیر تسک ها</NavLink>
            </>
        )
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSubTaskEdited(prevState => ({...prevState, [name] : value}));
    }

    const handleSubmitSubTaskForm = async (e) => {
        e.preventDefault();

        if (startDate) {
            setSubTaskEdited(subTaskEdited.subTaskStartDate = startDate);
        }
        if (endDate) {
            setSubTaskEdited(subTaskEdited.subTaskEndDate = endDate);
        }

        const result = await dispatch(editSubTaskThunk({subTaskEdited, subTaskId}));
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
            <h1 className={'header_titr'}>ویرایش زیر تسک « {subTasksList.subTaskTitle} »</h1>

            {errorMessage && (
                <h3 className={'error_message'}>{errorMessage}</h3>
            )}

            {successMessage && (
                <h3 className={'success_message'}>{successMessage}</h3>
            )}

            {loading ? (
                <Loading />
            ) : (
                <Form onSubmit={handleSubmitSubTaskForm}>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'subTask_title'}>عنوان تسک : </Form.Label>
                        <Form.Control type={'text'} id={'subTask_title'} name={'subTaskTitle'} value={subTaskEdited.subTaskTitle} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'subTaskEstimateTime'}>زمان تخمینی : </Form.Label>
                        <Form.Control type={'number'} id={'subTaskEstimateTime'} name={'subTaskEstimateTime'} value={subTaskEdited.subTaskEstimateTime} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'priority'}>اولویت : </Form.Label> <span>{subTaskEdited.subTaskPriority}</span>
                        <Form.Control type={'range'} id={'priority'} min={1} max={10} name={'subTaskPriority'} value={subTaskEdited.subTaskPriority} onChange={handleChange} />
                    </Form.Group>

                    <div>
                        <span>تاریخ شروع : {subTaskEdited.subTaskStartDate}</span>
                        <span> - </span>
                        <span>تاریخ پایان : {subTaskEdited.subTaskEndDate}</span>
                    </div>

                    <Deadline />

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'expert'}>کارشناس مجری : </Form.Label>
                        <Form.Select
                            aria-label="Select expert"
                            id={'expert'}
                            onChange={handleChange}
                            name={'subTaskExpert'}
                            multiple={false}
                        >
                            <option value="0" disabled={true}>انتخاب نمایید ...</option>
                            {membersList.map(member => (
                                <option key={member.id} value={member.user_name} selected={member.user_name === subTaskEdited.subTaskExpert ? true : false}>{member.first_name} {member.last_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'status'}>وضعیت : </Form.Label>
                        <Form.Select
                            id={'status'}
                            name={'subTaskStatus'}
                            onChange={handleChange}
                        >
                            <option value="0" disabled={true}>انتخاب کنید ...</option>
                            <option value="not_started" selected={subTaskEdited.subTaskStatus === 'not_started' ? true : false}>شروع نشده</option>
                            <option value="waiting" selected={subTaskEdited.subTaskStatus === 'waiting' ? true : false}>در انتظار</option>
                            <option value="doing" selected={subTaskEdited.subTaskStatus === 'doing' ? true : false}>در حال انجام</option>
                            <option value="completed" selected={subTaskEdited.subTaskStatus === 'completed' ? true : false}>تکمیل شده</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'attachment'}>فایل های پیوست : </Form.Label>
                        <Form.Control type={'file'}  multiple />
                        <Form.Text className="text-muted">این بخش در آینده قابل توسعه است.</Form.Text>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'description'}>توضیحات : </Form.Label>
                        <Form.Control as={'textarea'} id={'description'} rows={5} name={'subTaskDescription'} value={subTaskEdited.subTaskDescription} onChange={handleChange} />
                    </Form.Group>

                    <Button type={'submit'} className={'button_form'}>ویرایش</Button>
                </Form>
            )}
        </div>
    );
};

export default EditSubTask;
