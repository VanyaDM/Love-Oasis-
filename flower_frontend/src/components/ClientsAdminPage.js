import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
import "./ClientsAdminPage.css";

function ClientsAdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) return <Loading />;
    if (users.length === 0) return <Alert variant="info" className="text-center mt-4">Користувачів ще немає</Alert>;

    return (
        <Container className="clients-admin-page">
            <h2 className="text-center my-4">Клієнти</h2>
            <Table responsive striped bordered hover className="clients-table">
                <thead>
                    <tr>
                        <th>ID Клієнта</th>
                        <th>Ім'я клієнта</th>
                        <th>Прізвище</th>
                        <th>Телефон</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ClientsAdminPage;
