import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
import "./EditProductPage.css"

function EditProductPage() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Будь ласка, заповніть усі поля");
        }
        updateProduct({ id, name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "krokcoffee",
                uploadPreset: "wg5n2p6e",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container className="editProductContainer">
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Редагування товару</h1>
                        {isSuccess && <Alert variant="success">Товар оновлено</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Ім'я товару</Form.Label>
                            <Form.Control type="text" placeholder="Введіть ім'я товару" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Опис продукту</Form.Label>
                            <Form.Control as="textarea" placeholder="Опис продукту" style={{ height: "150px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ціна(UAH)</Form.Label>
                            <Form.Control type="number" placeholder="Ціна (UAH)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Категорія</Form.Label>
                            <Form.Select value={category}>
                                <option disabled selected>
                                Оберіть категорію
                                </option>
                                <option value="амариліс">Амариліс</option>
                                <option value="антуріум">Антуріум</option>
                                <option value="гвоздика">Гвоздика</option>
                                <option value="гербера">гербера</option>
                                <option value="гіацинт">Гіацинт</option>
                                <option value="гортензія">Гортензіяа</option>
                                <option value="еустома">Еустома</option>
                                <option value="ірис">Ірис</option>
                                <option value="лілія">Лілія</option>
                                <option value="орхідея">Орхідея</option>
                                <option value="півонія">Півонія</option>
                                <option value="ромашка">Ромашка</option>
                                <option value="троянда">Троянда</option>
                                <option value="тюльпан">Тюльпан</option>
                                <option value="хризантема">Хризантема</option>

                                <option value="букети">Букети</option>
                                <option value="збірні букети">Збірні букети</option>
                                <option value="квіти в коробці">Квіти в коробці</option>

                                <option value="вази">Вази</option>
                                <option value="м'які іграшки">М'які іграшки</option>
                                <option value="кошики для гурманів">Кошики для гурманів</option>
                                <option value="торти та солодощі">Торти та солодощі</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <a className="addPictureButton" onClick={showWidget}>
                            Додайте Зображення
                            </a>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle text-danger" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button className="btn_orange shadow-none" type="submit" disabled={isLoading || isSuccess}>
                                Оновити Товар
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="edit-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default EditProductPage;
