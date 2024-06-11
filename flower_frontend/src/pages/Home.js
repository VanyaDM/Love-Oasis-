import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row, Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 7);

    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, [dispatch]);

    return (
        <div className="body">
            <div className="homeBanner">
                <Carousel controls={false} interval={5000} >
                    <Carousel.Item>
                        <img
                            className="d-block w-100 main-picture"
                            src="https://res.cloudinary.com/krokcoffee/image/upload/v1717832594/Main_banner_1_hrr9vx.png"
                            alt="Іноді квіти - це просто квіти"
                        />
                        <a className="btn shadow-none banner-btn" href="/category/всі квіти">Замовити</a>
                        <span className="homeBannerCopyright">Photo by <a style={{color: "black"}} href="https://unsplash.com/@evieshaffer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Evie S.</a> on <a style={{color: "black"}} href="https://unsplash.com/photos/pink-roses-illustration-_IpKsTK9gcE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></span>
  
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 main-picture"
                            src="https://res.cloudinary.com/krokcoffee/image/upload/v1717832594/Main_banner_2_n8uarr.png"
                            alt="Любов не має меж"   
                        />
                        <a className="btn shadow-none banner-btn" href="/category/всі квіти">Замовити</a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 main-picture"
                            src="https://res.cloudinary.com/krokcoffee/image/upload/v1717832595/Main_banner_3_tefcr2.png"
                            alt="Подаруй цим очам радість"
                        />
                        <a className="btn shadow-none banner-btn" href="/category/всі квіти">Замовити</a>
                        <span className="homeBlackBannerCopyright">Photo by <a style={{color: "white"}} href="https://unsplash.com/@tikh?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Atikh Bana</a> on <a style={{color: "white"}} href="https://unsplash.com/photos/woman-wearing-red-white-and-black-aztec-top-zPFws4toKhg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></span>
  
                    </Carousel.Item>
                </Carousel>
               
            </div>

            <div className="featured-products-container container">
                <h2 className="popularTitle" style={{paddingTop: "10px"}}>Популярні товари</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview key={product._id} {...product} />
                    ))}
                </div>
            </div>

            <div className="recent-products-container container mt-4">
                <h2>Оберіть квітку під настрій</h2>
                <Row>
                    {categories.slice(0, -7).map((category) => (
                        <LinkContainer key={category.name} to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                                        gap: "10px"
                                    }}
                                    className="category-tile"
                                >
                                    {category.value}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;
