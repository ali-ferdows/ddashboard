import React from 'react';
import {Col, Row} from "react-bootstrap";
import {ApprovalsPM, TasksList, UpcomingMeeting} from "../../components";

const Main = () => {
    return (
        <main>
            <Row className={'g-2'}>
                <Col sm={12}>
                    <UpcomingMeeting />
                </Col>
                <Col sm={12}>
                    <TasksList />
                </Col>
                <Col sm={12}>
                    <ApprovalsPM />
                </Col>
            </Row>
        </main>
    );
};

export default Main;
