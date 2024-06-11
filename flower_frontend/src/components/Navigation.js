import axios from "../axios";
import React, { useRef, useState, useEffect } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import "./Navigation.css";

const Notification = ({ notification }) => (
  <p className={`notification-${notification.status}`}>
    {notification.message}
    <br />
    <span>
      {notification.time.split("T")[0] + " " + notification.time.split("T")[1]}
    </span>
  </p>
);


const UserMenu = ({ user, handleLogout }) => (
  <NavDropdown title={`${user.name} ${user.lastname}`} id="basic-nav-dropdown">
    {user.isAdmin ? (
      <>
        <LinkContainer to="/admin">
          <NavDropdown.Item>Адміністрування</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/new-product">
          <NavDropdown.Item>Додати Товар</NavDropdown.Item>
        </LinkContainer>
      </>
    ) : (
      <>
        <LinkContainer to="/cart">
          <NavDropdown.Item>Кошик</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/orders">
          <NavDropdown.Item>Замовлення</NavDropdown.Item>
        </LinkContainer>
      </>
    )}
    <NavDropdown.Divider />
    <a className="btn shadow-none logout-btn" onClick={handleLogout}>Вийти</a>
  </NavDropdown>
);

const FlowerItem = ({ category, name, imgSrc }) => (
  <LinkContainer to={`/category/${category}`}>
    <NavDropdown.Item>
      <img width="20" height="20" src={imgSrc} alt={name} title={name} />
      {name}
    </NavDropdown.Item>
  </LinkContainer>
);

const NavigationLinks = ({ user }) => (
  <>
    <LinkContainer to="/category/всі квіти">
      <Nav.Link>Всі квіти</Nav.Link>
    </LinkContainer>

    <NavDropdown title="Букети" id="collapsible-nav-dropdown">
      <div className="dropdown-grid"></div>
      <div>
        <LinkContainer to="/category/букети">
          <NavDropdown.Item >Букети</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/category/збірні букети">
          <NavDropdown.Item>Збірні букети</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/category/квіти в коробці">
          <NavDropdown.Item>Квіти в коробці</NavDropdown.Item>
        </LinkContainer>
      </div>
    </NavDropdown>

    <NavDropdown title="Квіти" id="collapsible-nav-dropdown">
      <div className="dropdown-grid">
        {[
          ["амариліс", "Амариліс", "https://buketland.ua/image/cache/wp/gp/menu/icon/01-20x20.webp"],
          ["антуріум", "Антуріум", "https://buketland.ua/image/cache/wp/gp/menu/icon/02-20x20.webp"],
          ["гвоздика", "Гвоздика", "https://buketland.ua/image/cache/wp/gp/menu/icon/08-20x20.webp"],
          ["гербера", "Гербера", "https://buketland.ua/image/cache/wp/gp/menu/icon/09-20x20.webp"],
          ["гіацинт", "Гіацинт", "https://buketland.ua/image/cache/wp/gj/menu/icon/35-20x20.webp"],
          ["гортензія", "Гортензія", "https://buketland.ua/image/cache/wp/gp/menu/icon/11-20x20.webp"],
          ["еустома", "Еустома", "https://buketland.ua/image/cache/wp/gp/menu/icon/32-20x20.webp"],
          ["ірис", "Ірис", "https://buketland.ua/image/cache/wp/gp/menu/icon/12-20x20.webp"],
          ["лілія", "Лілія", "https://buketland.ua/image/cache/wp/gp/menu/icon/15-20x20.webp"],
          ["орхідея", "Орхідея", "https://buketland.ua/image/cache/wp/gp/menu/icon/16-20x20.webp"],
          ["півонія", "Півонія", "https://buketland.ua/image/cache/wp/gp/menu/icon/17-20x20.webp"],
          ["ромашка", "Ромашка", "https://buketland.ua/image/cache/wp/gp/menu/icon/26-20x20.webp"],
          ["троянда", "Троянда", "https://buketland.ua/image/cache/wp/gp/menu/icon/23-20x20.webp"],
          ["тюльпан", "Тюльпан", "https://buketland.ua/image/cache/wp/gp/menu/icon/27-20x20.webp"],
          ["хризантема", "Хризантема", "https://buketland.ua/image/cache/wp/gp/menu/icon/31-20x20.webp"]
        ].map(([category, name, imgSrc]) => (
          <FlowerItem key={category} category={category} name={name} imgSrc={imgSrc} />
        ))}
      </div>
    </NavDropdown>

    <NavDropdown title="Подарунки" id="collapsible-nav-dropdown">
      <div className="dropdown-grid"></div>
      <div>
        <LinkContainer to="/category/вази">
          <NavDropdown.Item>Вази</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/category/м'які іграшки">
          <NavDropdown.Item>М'які іграшки</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/category/кошики для гурманів">
          <NavDropdown.Item>Кошики для гурманів</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/category/торти та солодощі">
          <NavDropdown.Item>Торти та солодощі</NavDropdown.Item>
        </LinkContainer>
      </div>
    </NavDropdown>

    <LinkContainer to="/contacts">
      <Nav.Link>Контакти</Nav.Link>
    </LinkContainer>

    <LinkContainer to="/aboutus">
      <Nav.Link>
        <i className="far fa-heart"></i> Про love
      </Nav.Link>
    </LinkContainer>

    {user && (
      <LinkContainer to="/cart">
        <Nav.Link>
          <i className="fas fa-shopping-cart"></i>
          {user?.cart?.count > 0 && (
            <span className="badge badge-warning" id="cartcount">
              {user.cart.count}
            </span>
          )}
        </Nav.Link>
      </LinkContainer>
    )}
  </>
);

function Navigation() {
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  const handleToggleNotifications = () => {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      dispatch(resetNotifications());
      if (unreadNotifications > 0) {
        axios.post(`/users/${user._id}/updateNotifications`);
      }
    }
  };

  return (
    <Navbar  expand="lg" className="main_nav mb-0 py-0">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="https://res.cloudinary.com/krokcoffee/image/upload/v1717766815/Love_Oasis_klelzh.png"
              className="logo"
              alt="/"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavigationLinks user={user} />
            {!user ? (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="far fa-user-circle"></i> Вхід
                </Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <Nav.Link
                  style={{ position: "relative" }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className="fas fa-bell"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                  ></i>
                </Nav.Link>
                <UserMenu user={user} handleLogout={handleLogout} />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showNotifications && (
        <div
          className="notifications-container"
          ref={notificationRef}
          style={{
            position: "absolute",
            top: bellPos.bottom + 10,
            left: bellPos.left,
            display: showNotifications ? "block" : "none",
          }}
        >
          {user?.notifications?.length > 0 ? (
            user?.notifications.map((notification, index) => (
              <Notification key={index} notification={notification} />
            ))
          ) : (
            <p>Немає нових сповіщень</p>
          )}
        </div>
      )}
    </Navbar>
  );
}

export default Navigation;
