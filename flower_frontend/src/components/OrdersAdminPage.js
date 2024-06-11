import React, { useEffect, useState } from "react";
import { Badge, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";
import "./OrdersAdminPage.css";

function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function markShipped(orderId, ownerId) {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => {
                // Sort orders by createdAt in descending order
                const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            })
            .catch((e) => console.log(e));
    }

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
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                // Sort orders by createdAt in descending order
                const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sortedOrders);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">Замовлень ще немає</h1>;
    }

    function TableRow({ _id, count, owner, total, status, products, address, city, post_index }) {
        return (
            <tr>
                <td>{_id}</td>
                <td>{owner?.name}<br />{owner?.lastname}</td>
                <td>{owner?.email}<br />{owner?.phone}</td>
                <td>{count}</td>
                <td>{total} UAH</td>
                <td>{address}</td>
                <td>{city}</td>
                <td>{post_index}</td>
                <td>
                    {status === "обробка" ? (
                        <a className="markAsShipped" style={{ cursor: "pointer", textDecoration: "none" }} onClick={() => markShipped(_id, owner?._id)} disabled={loading}>
                            Позначити як відправлене
                        </a>
                    ) : (
                        <Badge bg="success">Відправлено</Badge>
                    )}
                </td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
                        Дивитися замовлення <i className="fa fa-eye"></i>
                    </span>
                </td>
            </tr>
        );
    }

    return (
        <div className="orders-admin-page">
            <h2 className="text-center my-4">Замовлення</h2>
            <Table striped bordered hover responsive className="orders-admin-table">
                <thead>
                    <tr>
                        <th>Номер замовлення</th>
                        <th>Замовник</th>
                        <th>Контактні дані</th>
                        <th>Кількість</th>
                        <th>Вартість</th>
                        <th>Адреса</th>
                        <th>Місто</th>
                        <th>Поштовий індекс</th>
                        <th>Статус</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
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
        </div>
    );
}

export default OrdersAdminPage;
