// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./sidebar.css";
import {NavLink} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <aside className={styles['sidebar']}>
            <Accordion>
                <Accordion.Item eventKey={0} className={'accordion_item'}>
                    <Accordion.Header> مدیریت جلسات </Accordion.Header>
                    <Accordion.Body>
                        <nav className={styles['child_item']}>
                            <NavLink to={'/sessions-category'}>مدیریت دسته بندی</NavLink>
                            <NavLink to={'/sessions-definition'}>تنظیم جلسه</NavLink>
                            <NavLink to={'/sessions-list'}>لیست جلسات</NavLink>
                            <NavLink to={'/feedback'}>ارسال فیدبک</NavLink>
                            <NavLink to={'/warnings'}>هشدارها</NavLink>
                        </nav>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={1} className={'accordion_item'}>
                    <Accordion.Header> مدیریت تسک ها </Accordion.Header>
                    <Accordion.Body>
                        <nav className={styles['child_item']}>
                            <NavLink to={'/tasks-list'}>لیست تسک ها</NavLink>
                            <NavLink to={'/task-definition'}>تعریف تسک</NavLink>
                            <NavLink to={'/gantt-chart'}>نمودار گانت</NavLink>
                        </nav>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={2} className={'accordion_item'}>
                    <Accordion.Header> گزارش گیری و آمار </Accordion.Header>
                    <Accordion.Body>
                        <nav className={styles['child_item']}>
                            <NavLink to={'/'}>گزارش پیشرفت</NavLink>
                            <NavLink to={'/'}>آمار تسک ها</NavLink>
                            <NavLink to={'/'}>نمودار میله ای</NavLink>
                        </nav>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={3} className={'accordion_item'}>
                    <Accordion.Header> مدیریت اعضا </Accordion.Header>
                    <Accordion.Body>
                        <nav className={styles['child_item']}>
                            <NavLink to={'/member-information'}>اطلاعات اعضا</NavLink>
                            <NavLink to={'/member-access'}>سیستم دسترسی</NavLink>
                        </nav>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={4} className={'accordion_item'}>
                    <Accordion.Header> سیستم اعلانات </Accordion.Header>
                    <Accordion.Body>
                        <nav className={styles['child_item']}>
                            <NavLink to={'/'}>اعلانات سیستم</NavLink>
                            <NavLink to={'/'}>پیگیری تغییرات</NavLink>
                        </nav>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </aside>
    );
};

export default Sidebar;
