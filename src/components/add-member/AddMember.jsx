// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import styles from './AddMember.module.css';
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMembersThunk, memberState} from "../../store/member.js";

const AddMember = () => {
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
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllMembersThunk())
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMemberInfo({ ...memberInfo, [name]: value });
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
        const duplicateUserName = membersList.find((member) => {
            return member.user_name === memberInfo['user_name'];
        });

        if (duplicateUserName) {
            setErrorMessage('این نام کاربری قبلا وارد شده است.');
            return false;
        }

        const duplicateEmail = membersList.find((member) => {
            return member.email === memberInfo['email'];
        });

        if (duplicateEmail) {
            setErrorMessage('این ایمیل قبلا وارد شده است.');
            return false;
        }

        return true;
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {

                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(memberInfo),
                });

                if (response.ok) {
                    console.log('Data successfully sent to JSON Server');
                    setSuccessMessage('عالی! عضو جدید با موفقیت افزوده شد.');
                    setErrorMessage('');
                    document.getElementById("create-member-form").reset();
                } else {
                    console.error('Failed to send data to JSON Server');
                    setErrorMessage('متاسفانه مشکلی در ذخیره اطلاعات رخ داده است. لطفاً دوباره تلاش کنید.');
                }
            }
            catch (error) {
                console.error('Error:', error);
                setErrorMessage('متاسفانه یک مشکل فنی رخ داده است. لطفاً به پشتیبانی ما اطلاع دهید.');
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <h1 className={'header_titr'}>عضو جدید</h1>

            {errorMessage && (
                <h3 className={styles['error_message']}>{errorMessage}</h3>
            )}

            {successMessage && (
                <h3 className={'success_message'}>{successMessage}</h3>
            )}

            <Form className={styles['add_member_form']} id={'create-member-form'} onSubmit={handleSubmitForm}>
                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'first_name'}>نام : </Form.Label>
                    <Form.Control type={'text'} id={'first_name'} name={'first_name'} onChange={handleChange} />
                </Form.Group>

                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'last_name'}>نام خانوادگی : </Form.Label>
                    <Form.Control type={'text'} id={'last_name'} name={'last_name'} onChange={handleChange} />
                </Form.Group>

                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'birthday'}>تاریخ تولد : </Form.Label>
                    <Form.Control type={'text'} id={'birthday'} name={'birthday'} placeholder={'1370/01/01'} onChange={handleChange} />
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
                    />
                    <Form.Check
                        type={'radio'}
                        id={'female'}
                        label={'مونث'}
                        name={'gender'}
                        value={'female'}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'user_id'}>کد ملی : </Form.Label>
                    <Form.Control type={'tel'} id={'user_id'} parent={[0-9]} name={'user_id'} onChange={handleChange} />
                </Form.Group>

                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'user_name'}>نام کاربری : </Form.Label>
                    <Form.Control type={'text'} id={'user_name'} name={'user_name'} onChange={handleChange} />
                </Form.Group>

                <Form.Group className={'form_group'}>
                    <Form.Label htmlFor={'email'}>ایمیل : </Form.Label>
                    <Form.Control type={'email'} id={'email'} name={'email'} onChange={handleChange} />
                </Form.Group>

                <Button type={'submit'} className={'button_form'}>ایجاد</Button>
            </Form>

        </div>
    );
};

export default AddMember;
