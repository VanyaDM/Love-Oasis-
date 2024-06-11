import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import './AboutUs.css';

class AboutUs extends Component {
    render() {
        return (
            <div className='aboutUsPageContainer'>
                <div className='aboutUsBanner'>
                    <h1 className='aboutUsMainText pt-3'> <i className="far fa-heart"></i> Про Love <i className="far fa-heart"></i></h1>
                    <span className="aboutUsBannerCopyright">
                        Photo by <a href="https://unsplash.com/@evieshaffer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Evie S.</a> on <a href="https://unsplash.com/photos/red-petaled-flower-bSVGnUCk4tk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                    </span>
                </div>
                <Container className="mt-5 aboutUsMainContainer">
                    <Row>
                        <Col>
                            <h2>Наша Місія</h2>
                            <p>Ми створюємо найкращі квіткові композиції та подарунки для вас та ваших близьких. Наша мета - подарувати радість та незабутні емоції.</p>
                        </Col>
                        <Col>
                            <h2>Наша Історія</h2>
                            <p>Love був заснований в 2024 році великими ентузіастами квітів. І хоча ми тільки починаємо свою діяльність, на меті ми маємо стати одним із лідерів в своїй сфері.</p>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h2>Наші Партнери</h2>
                            <p>Ми співпрацюємо з найкращими постачальниками квітів та подарунків, щоб забезпечити вас тільки найкращою продукцією. Наші партнери - гарантія якості та свіжості кожного букету.</p>
                        </Col>
                        <Col>
                            <h2>Наша Команда</h2>
                            <p>Наша команда - це справжні професіонали своєї справи. Вони з великою любов'ю створюють кожен букет та подарунок, дбаючи про кожну деталь і ваші побажання.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AboutUs;
