import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password });
    }
    return (
        <Container className="loginContainer">
            <Row>
                <Col md={6} className="login__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleLogin}>
                        <h1>Вхід</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введіть пароль" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <button className="btn shadow-none loginPageButton" type="submit" disabled={isLoading}>Увійти</button>
                        </Form.Group>

                        <p className="pt-3 text-center">
                            У вас ще немає облікового запису? <Link style={{ color: "black", fontWeight: "700", fontSize: "18px" }} to="/signup">Зареєструватися</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="login__image--container">
                    <span className="LoginBannerCopyright">
                        Photo by <a href="https://unsplash.com/@khlebnikovayulia?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Yulia Khlebnikova</a> on <a href="https://unsplash.com/photos/pink-and-yellow-tulips-in-clear-glass-vase-mdE6-YNEqhU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                    </span>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
