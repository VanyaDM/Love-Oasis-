import React, { useEffect, useState } from "react";
import { Badge, Container, Table,  Modal, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import "./OrdersPage.css";

function OrdersPage() {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        setShow(true);
        setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/users/${user._id}/orders`)
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, [user._id]);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <Alert variant="info" className="text-center mt-3">Замовлень ще не було</Alert>;
    }

    const getStatusBadge = (status) => {
        if (status === "обробка") {
            return <Badge bg="warning" text="white"><i className="fas fa-box-open"></i> {status}</Badge>;
        } else if (status === "завершено") {
            return <Badge bg="danger" text="white"><i className="fas fa-times-circle"></i> {status}</Badge>;
        } else {
            return <Badge bg="success" text="white"><i className="fas fa-check-circle"></i> {status}</Badge>;
        }
    };

    return (
        <Container style={{ minHeight: "95vh" }} className="orders-page " >
            <h1 className="text-center mb-4">Ваші замовлення</h1>
            <Table responsive="sm" className="orders-table">
                <thead>
                    <tr>
                        <th>Номер замовлення</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Вартість</th>
                        <th>Деталі</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.total.toFixed(2)} UAH</td>
                            <td>
                                <span style={{ cursor: "pointer" }} onClick={() => showOrder(order.products)}>
                                    Дивитися замовлення <i className="fa fa-eye"></i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} dialogClassName="order-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Деталі замовлення</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderToShow.map((order) => (
                        <div className="order-details__container d-flex align-items-center justify-content-between py-2" key={order._id}>
                            <img src={order.pictures[0].url} className="order-details__image me-3" alt={order.name} />
                            <div className="order-details__info flex-grow-1">
                                <p className="order-details__name mb-1">
                                    <span>{order.count} x </span> {order.name}
                                </p>
                                <p className="order-details__price mb-0">Ціна: {Number(order.price) * order.count} UAH</p>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-outline-dark shadow-none order-modal__close-button" onClick={handleClose}>
                        Закрити
                    </button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default OrdersPage;
