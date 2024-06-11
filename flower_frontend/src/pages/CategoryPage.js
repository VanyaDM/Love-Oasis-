import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import categories from "../categories"; // Import categories data
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import Pagination from "../components/Pagination";
import "./CategoryPage.css";

function CategoryPage() {
    const { category } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]); // Default price range
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showFilters, setShowFilters] = useState(false); // State to show/hide filters

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/category/${category}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [category]);

    if (loading) {
        return <Loading />;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) // Filter by selected categories
    );

    function ProductSearch({ _id, price, name, pictures }) {
        return <ProductPreview _id={_id} price={price} name={name} pictures={pictures} />;
    }

    function toggleCategory(categoryName) {
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    }

    return (
        <div className="category-page-container">
            <div className={`pt-3 ${category}-banner-container category-banner-container`}>
                <h1 className="main-text">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <span className="bannerCopyright">
                Photo by <a href="https://unsplash.com/@dirtjoy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Zoe Schaeffer</a> on <a href="https://unsplash.com/photos/pink-green-and-white-flower-bouquet-xmpC7N_e2HI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </span>
            </div>

            <div className="search-and-filter-container">
                <Form.Group controlId="formSearch" className="search-form shadow-none">
                    <Form.Control
                        type="text"
                        placeholder="Пошук"
                        className="mr-sm-4"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="secondary"
                    className="filter-toggle-btn shadow-none"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FontAwesomeIcon icon={showFilters ? faTimes : faFilter} />
                    {showFilters ? ' Закрити Фільтри' : ' Показати Фільтри'}
                </Button>
            </div>

            <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
                <div className="filters-container">
                    <div className="price-range-container">
                        <Form.Label>Ціна</Form.Label>
                        <Slider
                            range
                            min={0}
                            max={10000}
                            defaultValue={[0, 10000]}
                            value={priceRange}
                            onChange={(value) => setPriceRange(value)}
                            trackStyle={[{ backgroundColor: '#799351' }]}
                            handleStyle={[
                                { borderColor: '#799351', backgroundColor: '#fff' },
                                { borderColor: '#799351', backgroundColor: '#fff' }
                            ]}
                        />
                        <div className="price-inputs">
                            <input type="number" min="0" max="10000" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} />
                            <span> - </span>
                            <input type="number" min="0" max="10000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} />
                        </div>
                    </div>
                    <br />
                    {category === "всі квіти" && (
                        <div className="filter-range-container">
                            <Form.Label>Квіти</Form.Label>
                            <Table responsive="lg" className="filter-table">
                                <tbody>
                                    {categories.slice(0, -7).map((cat, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    label={cat.value}
                                                    checked={selectedCategories.includes(cat.name)}
                                                    onChange={() => toggleCategory(cat.name)}
                                                />
                                            </td>
                                            <td>
                                                <img src={cat.img} alt={cat.value} style={{ maxWidth: "50px" }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <h1>Нічого не знайдено</h1>
            ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Pagination data={filteredProducts} RenderComponent={ProductSearch} pageLimit={1} dataLimit={12} tablePagination={false} />
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default CategoryPage;
