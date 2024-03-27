import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Main, Sidebar} from "../index.js";

const Content = () => {
    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <Main />
                </Col>
            </Row>
        </Container>
    );
};

export default Content;
