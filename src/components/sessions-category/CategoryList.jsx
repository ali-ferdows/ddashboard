// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import styles from './SessionsCategory.module.css';
import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {categoryThunk} from "../../store/category_thunk.js";
import {Loading} from "../index.js";

const CategoryList = () => {
    const {categoryList, loading, error} = useSelector(state => state.categoryList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categoryThunk());
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div className={styles['error_message']}>
                <p>در لود لیست دسته ها مشکلی اتفاق افتاده است. لطفا با پشتیبانی نرم افزار تماس بگیرید.</p>
            </div>
        )
    }

    return (
        <>
            {categoryList.length > 0 && (
                <div>
                    <Table striped hover={true} responsive={true}>
                        <thead>
                        <tr>
                            <th>عنوان دسته</th>
                            <th>نام لاتین</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categoryList.map(category => (
                            <tr key={category.id}>
                                <td>{category.category_name}</td>
                                <td>{category.category_en_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>

    );
};

export default CategoryList;
