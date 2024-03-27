// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Sidebar} from "../../Layout/index.js";
import {Outlet} from "react-router-dom";

const Homepage = () => {
    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <Sidebar />
                </Col>
                <Col sm={9}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default Homepage;
