import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";
import "./ProductPage.css";

function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();

    useEffect(() => {
        axios.get(`/products/${id}`)
            .then(({ data }) => {
                setProduct(data.product);
                setSimilar(data.similar);
            })
            .catch((error) => {
                console.error("Failed to fetch product data:", error);
            });
    }, [id]);

    if (!product) {
        return <Loading />;
    }

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const images = product.pictures.map((picture, index) => (
        <img
            key={index}
            className="product__carousel--image"
            src={picture.url}
            alt={`Product Image ${index + 1}`}
            onDragStart={handleDragStart}
        />
    ));

    const similarProducts = similar ? similar.map((product, idx) => (
        <div key={idx} className="item" data-value={idx}>
            <SimilarProduct {...product} />
        </div>
    )) : [];

    return (
        <Container className="product-page pt-5">
            <div className="product-content">
                <Row>
                    <Col md={6}>
                        <AliceCarousel
                            className="main_carousel"
                            mouseTracking
                            items={images}
                            animationType="fadeout"
                            infinite
                            controlsStrategy="alternate"
                        />
                    </Col>
                    <Col md={6} className="pt-4 product-details-col">
                        <h1 className="product-title">{product.name}</h1>
                        <p>
                            <Badge bg="success" className="product-category">{product.category}</Badge>
                        </p>
                        <p className="product__price">{product.price} UAH</p>
                        <p className="product__description">
                            <strong>Опис: </strong><span>{product.description}</span>
                        </p>
                        {!user && (
                            <LinkContainer to="/login">
                                 <a className="btn-outline-dark shadow-none">Бажаєте придбати?</a>
                            </LinkContainer>
                        )}
                        {user && !user.isAdmin && (
                            <ButtonGroup>
                                <a 
                                    className="btn_green shadow-none"
                                    onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, image: product.pictures[0].url })}
                                >
                                    Додати в Кошик</a>
                            </ButtonGroup>
                        )}
                        {user && user.isAdmin && (
                            <LinkContainer to={`/product/${product._id}/edit`}>
                                <a className="btn_orange shadow-none">Редагувати Товар</a>
                            </LinkContainer>
                        )}
                        {isSuccess && <ToastMessage bg="info" style={{display: "block"}} title="Додано в Кошик" body={`${product.name} в Кошику`} />}
                    </Col>
                </Row>
            </div>
            <div className="mt-4">
                <h2 className="similar-products-title">Схожі товари</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel
                        mouseTracking
                        items={similarProducts}
                        responsive={responsive}
                        paddingLeft={50}
                        paddingRight={50}
                        controlsStrategy="alternate"
                        infinite
                    />
                </div>
            </div>
        </Container>
    );
}

export default ProductPage;
