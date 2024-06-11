import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Button, Col, Container, Row, Table, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
import "./CartPage.css";

const stripePromise = loadStripe("pk_test_51N8A4bB6uaRrI20WEvlQ3EH4PAC5gXMm2axOo58FAefL5So2GRByOhvRor629j139CdRGDlBN2Rsdpo8bwiOIiEL00F6vga8hn");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    const cart = products.filter((product) => userCartObj[product._id] != null);
    const [increaseCart] = useIncreaseCartProductMutation();
    const [decreaseCart] = useDecreaseCartProductMutation();
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    function handleDecrease(product) {
        const quantity = user.cart[product.productId];
        if (quantity <= 1) return alert("Не вдається продовжити");
        decreaseCart(product);
    }

    return (
        <Container style={{ minHeight: "90vh" }} className="cart-container">
            <Row className="my-4">
                <Col>
                    <h1 className="pt-2 h3 text-center">Кошик</h1>
                    {cart.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            Кошик порожній. Додайте товари до свого кошика
                        </Alert>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </Col>
                {cart.length > 0 && (
                    <Col md={7} className="order-md-last">
                        <Table responsive="sm" className="cart-table">
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>Товар</th>
                                    <th>Ціна за один</th>
                                    <th>Кількість</th>
                                    <th>Вартість</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            {!isLoading && (
                                                <i
                                                    className="fa fa-times text-danger"
                                                    style={{ marginRight: 10, cursor: "pointer" }}
                                                    onClick={() => removeFromCart({ productId: item._id, price: item.price, userId: user._id })}
                                                ></i>
                                            )}
                                        </td>
                                        <td>
                                            <Image src={item.pictures[0].url} rounded style={{ width: 100, height: 100, objectFit: "cover" }} />
                                        </td>
                                        <td>{item.price} UAH</td>
                                        <td>
                                            <span className="quantity-indicator">
                                                <i
                                                    className="fa fa-minus-circle text-warning"
                                                    onClick={() => handleDecrease({ productId: item._id, price: item.price, userId: user._id })}
                                                ></i>
                                                <span className="mx-2">{user.cart[item._id]}</span>
                                                <i
                                                    className="fa fa-plus-circle text-success"
                                                    onClick={() => increaseCart({ productId: item._id, price: item.price, userId: user._id })}
                                                ></i>
                                            </span>
                                        </td>
                                        <td>{item.price * user.cart[item._id]} UAH</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="text-right">
                            <h3 className="h4 pt-4">Сумарна Вартість: <span className="user-cart-total">{user.cart.total} UAH</span></h3>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default CartPage;
