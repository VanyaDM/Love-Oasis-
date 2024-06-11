import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './ProductPreview.css'; // Importing a CSS file for additional styling

function ProductPreview({ _id, name, price, pictures }) {
    return (
        <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", margin: "10px" }}>
            <Card className="product-preview-card">
                <Card.Img 
                    variant="top" 
                    className="product-preview-img" 
                    src={pictures[0].url} 
                    alt={name} 
                />
                <Card.Body>
                    <Card.Title className="product-preview-title">{name}</Card.Title>
                    <h2 className="product-preview-price">{price} UAH</h2>
                </Card.Body>         
            </Card>
        </LinkContainer>
    );
}

export default ProductPreview;
