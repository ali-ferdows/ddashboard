// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useMemo} from 'react';
import styles from './EditMember.module.css';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {editMemberThunk, fetchSingleMemberThunk, memberState} from "../../store/member.js";
import {Button, Form} from "react-bootstrap";

const EditMember = () => {
    const {memberId} = useParams();
    const {membersList, loading, error} = useSelector(memberState);
    const dispatch = useDispatch();
    const [memberInfo, setMemberInfo] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        gender: '',
        user_id: '',
        user_name: '',
        email: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const memoizedMembersList = useMemo(() => membersList, [membersList]);

    useEffect(() => {
        dispatch(fetchSingleMemberThunk(memberId));
    }, [dispatch, memberId]);

    useEffect(() => {
        if (membersList.length > 0) {
            setMemberInfo(membersList[0]); // Assuming the API returns a single member based on memberId
        }
    }, [membersList]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMemberInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        const patternCode = /^[0-9]{10}$/gm;
        const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
        const patternBirthday = /^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/gm;

        if (memberInfo['user_id'].length === 0) {
            setErrorMessage('فیلد کد ملی به دلیل اینکه به عنوان پسورد اولیه ورود کاربر لحاظ می شود ضروری است.');
            return false;
        }
        if (!patternCode.test(memberInfo['user_id'])) {
            setErrorMessage('فرمت کد ملی مناسب نیست و باید حتما 10 رقمی بدون هیچ کاراکتر و فاصله ای باشد.');
            return false;
        }
        if (!patternEmail.test(memberInfo['email'])) {
            setErrorMessage('فرمت ایمیل وارد شده مناسب نیست و نیاز به اصلاح دارد.');
            return false;
        }
        if (!patternBirthday.test(memberInfo['birthday'])) {
            setErrorMessage('فرمت تاریخ تولد مناسب نیست. متناسب با الگو مثال وارد شود.');
            return false;
        }

        return true;
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const result = await dispatch(editMemberThunk({memberInfo, memberId}));
            if (result.meta.requestStatus === "fulfilled") {
                setSuccessMessage("عالی! اطلاعات کاربر با موفقیت ویرایش شد.");
                setErrorMessage("");
            }else{
                setErrorMessage("ویرایش اطلاعات با مشکل مواجه گردید. لطفا بعدا مجدد تلاش نمایید.");
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <h1 className={'header_titr'}>ویرایش اطلاعات اعضا</h1>

            {errorMessage && (
                <h3 className={styles['error_message']}>{errorMessage}</h3>
            )}

            {successMessage && (
                <h3 className={'success_message'}>{successMessage}</h3>
            )}

            {memoizedMembersList.length > 0 && (
                <Form className={styles['add_member_form']} id={'create-member-form'} onSubmit={handleSubmitForm}>

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'first_name'}>نام : </Form.Label>
                        <Form.Control type={'text'} id={'first_name'} name={'first_name'} value={memberInfo.first_name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'last_name'}>نام خانوادگی : </Form.Label>
                        <Form.Control type={'text'} id={'last_name'} name={'last_name'} value={memberInfo.last_name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'birthday'}>تاریخ تولد : </Form.Label>
                        <Form.Control type={'text'} id={'birthday'} name={'birthday'} value={memberInfo.birthday} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className={`${styles['gender']} form_group`}>
                        <Form.Label htmlFor={'gender'}>جنسیت : </Form.Label>
                        <Form.Check
                            type={'radio'}
                            id={'male'}
                            label={'مذکر'}
                            name={'gender'}
                            value={'male'}
                            onChange={handleChange}
                            checked={memberInfo.gender === 'male'}
                        />
                        <Form.Check
                            type={'radio'}
                            id={'female'}
                            label={'مونث'}
                            name={'gender'}
                            value={'female'}
                            onChange={handleChange}
                            checked={memberInfo.gender === 'female'}
                        />
                    </Form.Group>

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'user_id'}>کد ملی : </Form.Label>
                        <Form.Control type={'tel'} id={'user_id'} parent={[0-9]} name={'user_id'} value={memberInfo.user_id} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'user_name'}>نام کاربری : </Form.Label>
                        <Form.Control type={'text'} id={'user_name'} name={'user_name'} value={memberInfo.user_name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className={'form_group'}>
                        <Form.Label htmlFor={'email'}>ایمیل : </Form.Label>
                        <Form.Control type={'email'} id={'email'} name={'email'} value={memberInfo.email} onChange={handleChange} />
                    </Form.Group>

                    <Button type={'submit'} className={'button_form'}>اعمال تغییرات</Button>
                </Form>
            )}
        </div>
    );
};

export default EditMember;
