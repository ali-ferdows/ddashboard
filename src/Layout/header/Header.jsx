import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <Container fluid className={'p-0'}>
            <header className={styles['header']}>
                <Container>
                    <Row>
                        <Col sm={3}>
                            <div>
                                <NavLink to={'/'}>
                                    <img src="src/assets/img/logo-no-background.png" alt={'logo'} width={200} />
                                </NavLink>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <nav className={styles['navbar_header']}>
                                <NavLink to={'/guide'}>راهنما</NavLink>
                                <NavLink to={'/about'}>درباره ما</NavLink>
                            </nav>
                        </Col>
                        <Col sm={3}>

                        </Col>
                    </Row>
                </Container>
            </header>
        </Container>
    );
};

export default Header;
