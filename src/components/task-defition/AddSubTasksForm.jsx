import React, {useState} from 'react';
import styles from "./SubTasks.module.css";
import {NodePlusFill, XCircleFill} from "react-bootstrap-icons";
import {Button, Form} from "react-bootstrap";
import {insertSubTasksThunk} from "../../store/subTask_thunk.js";
import {useDispatch, useSelector} from "react-redux";
import DeadLine from "../deadline/DeadLine.jsx";
import {endDataState, startDateState} from "../../store/deadlin.js";

const AddSubTasksForm = ({taskId, membersList}) => {

    const startDate = useSelector(startDateState);
    const endDate = useSelector(endDataState);
    const [subTasks, setSubTasks] = useState([{}]);
    const dispatch = useDispatch();
    const [subTasksInfo, setSubTasksInfo] = useState({
        'parentTaskId': taskId,
        'subTaskTitle': '',
        'subTaskEstimateTime': '',
        'subTaskPriority': 5,
        'subTaskStartDate': '',
        'subTaskEndDate': '',
        'subTaskExpert': '',
        'subTaskStatus': '',
        'subTaskDescription': ''
    });

    const handleRemoveSubTask = (index) => {
        setSubTasks(prevSubTasks => {
            const updatedSubTasks = [...prevSubTasks];
            updatedSubTasks.splice(index, 1);
            return updatedSubTasks;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubTasksInfo({...subTasksInfo, [name] : value});
    };

    const handleAddSubTask = () => {
        setSubTasks([...subTasks, {}]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedSubTasksInfo = {
            ...subTasksInfo,
            subTaskStartDate: startDate,
            subTaskEndDate: endDate
        };
        dispatch(insertSubTasksThunk(updatedSubTasksInfo));
        setSubTasksInfo({
            'parentTaskId': taskId,
            'subTaskTitle': '',
            'subTaskEstimateTime': '',
            'subTaskPriority': 5,
            'subTaskStartDate': '',
            'subTaskEndDate': '',
            'subTaskExpert': '',
            'subTaskStatus': '',
            'subTaskDescription': ''
        });
    };

    return (
        <Form onSubmit={handleSubmit}>

            {subTasks.map((subTask, index) => (
                <div key={index}>
                    <div className={`${styles['header_form']} d-flex justify-content-between`}>
                        <h3 className={styles['form_num']}>زیر تسک شماره {index + 1}</h3>
                        {index>0 && (
                            <XCircleFill size={30} onClick={handleRemoveSubTask} />
                        )}
                    </div>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_title_${index}`}>عنوان زیر تسک : </Form.Label>
                        <Form.Control type={'text'} id={`subTask_title_${index}`} name={`subTaskTitle`}onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_estimateTime_${index}`}>زمان تخمینی : </Form.Label>
                        <Form.Control type={'number'} id={`subTask_estimateTime_${index}`} name={`subTaskEstimateTime`}onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_priority_${index}`}>اولویت : </Form.Label> <span>{subTasksInfo.subTaskPriority}</span>
                        <Form.Control type={'range'} id={`subTask_priority_${index}`} min={1} max={10} name={`subTaskPriority`}onChange={handleChange} />
                    </Form.Group>

                    <DeadLine />

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_expert_${index}`}>کارشناس مجری : </Form.Label>
                        <Form.Select
                            aria-label="Select expert"
                            id={`subTask_expert_${index}`}
                            onChange={handleChange}
                            name={`subTaskExpert`}
                            multiple={false}
                        >
                            <option value="0" disabled={true} selected={true}>انتخاب نمایید ...</option>
                            {membersList.map(member => (
                                <option key={member.id} value={member.user_name}>{member.first_name} {member.last_name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_status_${index}`}>وضعیت : </Form.Label>
                        <Form.Select
                            id={`subTask_status_${index}`}
                            name={`subTaskStatus`}
                            onChange={handleChange}
                        >
                            <option value="0" disabled={true} selected={true}>انتخاب کنید ...</option>
                            <option value="not_started">شروع نشده</option>
                            <option value="waiting">در انتظار</option>
                            <option value="doing">در حال انجام</option>
                            <option value="completed">تکمیل شده</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_attachment_${index}`}>فایل های پیوست : </Form.Label>
                        <Form.Control type={'file'}  multiple />
                        <Form.Text className="text-muted">این بخش در آینده قابل توسعه است.</Form.Text>
                    </Form.Group>
                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={`subTask_description_${index}`}>توضیحات : </Form.Label>
                        <Form.Control as={'textarea'} id={`subTask_description_${index}`} rows={5} name={`subTaskDescription`} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Text className={styles['message_subTask_form']}>قبل از ایجاد فرم جدید اطلاعات وارد شده در این فرم را ذخیره نمایید.</Form.Text>
                    </Form.Group>
                    <Button type={'submit'} className={'button_form'}>ذخیره</Button>
                </div>
            ))}

            <div className={styles['add_form']} onClick={handleAddSubTask}>
                <NodePlusFill size={40} />
            </div>
        </Form>
    );
};

export default AddSubTasksForm;
