// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './TasksListDashboard.module.css';
import 'react-circular-progressbar/dist/styles.css';
import {CircularProgressbar} from "react-circular-progressbar";

const TasksListDashboard = () => {
    const now = 35;
    const now1 = 28;
    const now2 = 89;
    const now3 = 10;
    return (
        <div className={`${styles['taskslist_contents']} homepage_boxes_container d-flex flex-wrap`}>
            <header className={'w-100'}>
                <h3>لیست تسک ها</h3>
            </header>

            <div className={`${styles['taskslist_content']} d-flex`}>
                <div className={styles['taskslist_info']}>
                    <div className={styles['taskslist_title']}>
                        تسک شماره یک
                    </div>
                    <div className={styles['taskslist_name']}>
                        امیر امیری
                    </div>
                    <div className={styles['taskslist_dates']}>
                        <div className={styles['start_date']}>
                            <span>تاریخ شروع:</span>
                            <span>1402/12/01</span>
                        </div>
                        <div className={styles['end_date']}>
                            <span>تاریخ پایان:</span>
                            <span>1402/12/20</span>
                        </div>
                    </div>
                </div>
                <div className={'h-100 w-50 d-flex align-items-center justify-content-center'}>
                    <div className={'taskslist_progressbar'}>
                        <CircularProgressbar value={now} text={`${now}%`} />
                    </div>
                </div>
            </div>
            <div className={`${styles['taskslist_content']} d-flex`}>
                <div className={styles['taskslist_info']}>
                    <div className={styles['taskslist_title']}>
                        تسک شماره یک
                    </div>
                    <div className={styles['taskslist_name']}>
                        امیر امیری
                    </div>
                    <div className={styles['taskslist_dates']}>
                        <div className={styles['start_date']}>
                            <span>تاریخ شروع:</span>
                            <span>1402/12/01</span>
                        </div>
                        <div className={styles['end_date']}>
                            <span>تاریخ پایان:</span>
                            <span>1402/12/20</span>
                        </div>
                    </div>
                </div>
                <div className={'h-100 w-50 d-flex align-items-center justify-content-center'}>
                    <div className={'taskslist_progressbar'}>
                        <CircularProgressbar value={now1} text={`${now1}%`} />
                    </div>
                </div>
            </div>
            <div className={`${styles['taskslist_content']} d-flex`}>
                <div className={styles['taskslist_info']}>
                    <div className={styles['taskslist_title']}>
                        تسک شماره یک
                    </div>
                    <div className={styles['taskslist_name']}>
                        امیر امیری
                    </div>
                    <div className={styles['taskslist_dates']}>
                        <div className={styles['start_date']}>
                            <span>تاریخ شروع:</span>
                            <span>1402/12/01</span>
                        </div>
                        <div className={styles['end_date']}>
                            <span>تاریخ پایان:</span>
                            <span>1402/12/20</span>
                        </div>
                    </div>
                </div>
                <div className={'h-100 w-50 d-flex align-items-center justify-content-center'}>
                    <div className={'taskslist_progressbar'}>
                        <CircularProgressbar value={now2} text={`${now2}%`} />
                    </div>
                </div>
            </div>
            <div className={`${styles['taskslist_content']} d-flex`}>
                    <div className={styles['taskslist_info']}>
                        <div className={styles['taskslist_title']}>
                            تسک شماره یک
                        </div>
                        <div className={styles['taskslist_name']}>
                            امیر امیری
                        </div>
                        <div className={styles['taskslist_dates']}>
                            <div className={styles['start_date']}>
                                <span>تاریخ شروع:</span>
                                <span>1402/12/01</span>
                            </div>
                            <div className={styles['end_date']}>
                                <span>تاریخ پایان:</span>
                                <span>1402/12/20</span>
                            </div>
                        </div>
                    </div>
                    <div className={'h-100 w-50 d-flex align-items-center justify-content-center'}>
                        <div className={'taskslist_progressbar'}>
                            <CircularProgressbar value={now3} text={`${now3}%`} />
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default TasksListDashboard;
