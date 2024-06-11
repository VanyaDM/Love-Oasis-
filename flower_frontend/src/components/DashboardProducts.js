import React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteProductMutation } from "../services/appApi";
import Pagination from "./Pagination";
import "./DashboardProducts.css";
import { LinkContainer } from "react-router-bootstrap";

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // removing the product
    const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
    function handleDeleteProduct(id) {
        if (window.confirm("Ви впевнені?")) deleteProduct({ product_id: id, user_id: user._id });
    }

    function TableRow({ pictures, _id, name, category, price }) {
        return (
            <tr>
                <td>
                    <img src={pictures[0].url} className="dashboard-product-preview" alt={name} />
                </td>
                <td>{_id}</td>
                <td>
                    <div className="product-details">
                        <strong>{name}</strong>
                        <br />
                        <span className="text-muted">{category}</span>
                    </div>
                </td>
                <td>{price.toFixed(2)} UAH</td>
                <td>
                    <a className="deleteProductButton shadow-none me-2" onClick={() => handleDeleteProduct(_id)} disabled={isLoading} >
                        Видалити
                    </a>
                    <LinkContainer to={`/product/${_id}/edit`}>
                    <a className="editProductButton shadow-none">Редагувати</a>
                    </LinkContainer>
                </td>
            </tr>
        );
    }

    return (
        <div className="dashboard-products">
            <h2 className="text-center my-4">Список Товарів</h2>
            <Table striped bordered hover responsive className="products-table">
                <thead>
                    <tr>
                        <th>Зображення</th>
                        <th>ID Товару</th>
                        <th>Назва Товару</th>
                        <th>Вартість</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={6} tablePagination={true} />
                </tbody>
            </Table>
        </div>
    );
}

export default DashboardProducts;
