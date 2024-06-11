import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacts.css';

class Contacts extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        form.reset();
      } else {
        alert('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again later.');
    }
  };

  render() {
    return (
      <div className='contactsPageContainer'>
        <div className='pt-3 contactsBanner'>
          <h1 className='contactsMainText'>Контакти</h1>
          <span className="contactsBannerCopyright">
            Photo by <a href="https://unsplash.com/@owenyin?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Owen Yin</a> on <a href="https://unsplash.com/photos/tilt-shift-lens-photography-of-purple-flowers-e3Fxq_BdCBE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
          </span>
        </div>
        <Container className="pt-5 contactsBackground">
          <Row className="justify-content-md-center">
            <Col md={6}>
              <div className="contact-form">
                <h2>Зв'яжіться з нами</h2>
                <Form onSubmit={this.handleSubmit}>
                  {/* Add the hidden input for the access key */}
                  <input type="hidden" name="access_key" value="69fd506d-4ff3-4ff4-bfcd-c5c73bbfa155" />

                  <Form.Group controlId="name">
                    <Form.Label>Ваше ім'я</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Введіть ваше ім'я" />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Ваш E-mail</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Введіть вашу електронну пошту" />
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Ваш телефон</Form.Label>
                    <Form.Control type="tel" name="phone" placeholder="Введіть ваш номер телефону" />
                  </Form.Group>
                  <Form.Group controlId="message">
                    <Form.Label>Повідомлення</Form.Label>
                    <Form.Control as="textarea" name="message" rows={3} placeholder="Введіть ваше повідомлення" />
                  </Form.Group>
                  <Button className="btn_green shadow-none mt-3" type="submit">
                    Відправити
                  </Button>
                </Form>
              </div>
            </Col>
            <Col md={6}>
              <div className="contact-info">
                <h2>Контактна інформація</h2>
                <p>Центральний офіс</p>
                <p>г. Київ, вул. Табірна, 30/32</p>
                <p>Телефони контакт-центру</p>
                <p>+380 (44) 455-57-57</p>
                <p>+380 (99) 377-28-05</p>
                <p>Пошта для зв'язку</p>
                <p>loveoasis.flowers@gmail.com</p>
                <p>Час роботи контакт-центру</p>
                <p>Пн - Сб: 09:00 - 18:00, Нд. - Вихідний</p>
              </div>
              <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1269.962553167394!2d30.42646313661222!3d50.46111930745617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc48f823f49f%3A0x822b8d8b0cba7bd!2z0KPQvdC40LLQtdGA0YHQuNGC0LXRgiDRjdC60L7QvdC-0LzQuNC60Lgg0Lgg0L_RgNCw0LLQsCAi0JrQoNCe0Joi!5e0!3m2!1sru!2sua!4v1615976215324!5m2!1sru!2sua" width="600" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Contacts;
