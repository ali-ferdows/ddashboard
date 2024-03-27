import React, {useState, useEffect} from 'react';
import styles from './SessionsCategory.module.css';
import {Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {categoryState, setCategory} from "../../store/category.js";
import CategoryList from "./CategoryList.jsx";
import {categoryThunk} from "../../store/category_thunk.js";

const SessionsCategory = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const category = useSelector(categoryState);
    const dispatch = useDispatch();
    const {categoryList} = useSelector(state => state.categoryList);
    useEffect(() => {
        dispatch(categoryThunk());
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setCategory({...category, [name] : value}))
    }

    const submitFormCategory = async (e) => {
        e.preventDefault();

    if (category.category_en_name && category.category_name) {
        const hasDuplicate = categoryList.some(item => item.category_en_name === category.category_en_name);

        if (hasDuplicate) {
            setErrorMessage(`قبلا یک دسته با همین نام لاتین ایجاد کرده اید.`);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/category_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
            });

                if (response.ok) {
                    setSuccessMessage('عالی! جلسه با موفقیت افزوده شد.');
                    setErrorMessage('');
                    document.getElementById("create-category-form").reset();
                } else {
                    setErrorMessage('متاسفانه مشکلی در ذخیره اطلاعات رخ داده است. لطفاً دوباره تلاش کنید.');
                }
            } catch (error) {
                setErrorMessage('متاسفانه یک مشکل فنی رخ داده است. لطفاً به پشتیبانی ما اطلاع دهید.');
            }
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <h1 className={'header_titr'}>مدیریت دسته بندی</h1>

            {successMessage && <h1 className={'success_message'}>{successMessage}</h1>}
            {errorMessage && <h1 className={'error_message'}>{errorMessage}</h1>}

            <div className={styles['notice']}>
                <ol>
                    <li>لطفا در ایجاد دسته نهایت دقت را داشته باشید.</li>
                    <li>امکان حذف یا ویرایش برای دسته های ایجاد شده وجود ندارد.</li>
                    <li>تمامی جلساتی که ایجاد خواهید کرد زیر مجموعه یکی از این دسته ها خواهند بود.</li>
                </ol>
            </div>

            <Form className={`${styles['category_form']} d-flex align-items-center`} id={'create-category-form'} onSubmit={submitFormCategory}>
                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'category_name'}>عنوان دسته : </Form.Label>
                    <Form.Control type={'text'} id={'category_name'} name={'category_name'} onChange={handleChange} />
                </Form.Group>
                <Form.Group className={styles['form_group']}>
                    <Form.Label htmlFor={'category_en_name'}>نام لاتین : </Form.Label>
                    <Form.Control type={'text'} id={'category_en_name'} name={'category_en_name'} onChange={handleChange} />
                </Form.Group>
                <Button type={'submit'} className={`${styles['button']} button_form`}>ایجاد</Button>
            </Form>

            <CategoryList />
        </div>
    );
};

export default SessionsCategory;
