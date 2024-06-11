import React, { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, lastname, email, phone, password });
    }

    return (
        <Container className="signUpContainer">
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1>Створити аккаунт</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Ім'я</Form.Label>
                            <Form.Control type="text" placeholder="Ім'я" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Прізвище</Form.Label>
                            <Form.Control type="text" placeholder="Прізвище" value={lastname} required onChange={(e) => setLastname(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control type="text" placeholder="e.g. 0991234567" value={phone} pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Пароль" value={password} minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <button className="btn shadow-none singUpPageButton" type="submit" disabled={isLoading}>Зареєструватися</button>    
                        </Form.Group>
                        <p className="pt-3 text-center">
                            Маєте вже створений аккаунт? <Link style={{ color: "black", fontWeight: "700", fontSize: "18px" }} to="/login">Увійти</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container">
                    <span className="SignUpBannerCopyright">
                        Photo by <a href="https://unsplash.com/@ryunosuke_kikuno?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ryunosuke Kikuno</a> on <a href="https://unsplash.com/photos/blue-and-white-flowers-on-white-background-cFxUZ7UAf-c?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                    </span>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
