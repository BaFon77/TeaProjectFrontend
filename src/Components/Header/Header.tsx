import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {IRootState, useAppDispatch} from "../../store";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import "./HeaderStyle.css";
import {logoutUser} from "../../store/auth/actionCreators";
import {fetchTypes} from "../../api/shop/shopApi";
import {Dropdown} from "react-bootstrap";
import { history } from '../../utils/history'
import {FaShoppingCart} from "react-icons/fa";
import BasketZero from "../../pages/BasketZero/BasketZero";
import ShoppingCart from "../../pages/ShoppingCart";

const Header = () => {
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.access_token
    );

    const dispatch = useAppDispatch();

    const renderProfile = () => (
        <div>
            <div>Вы успешно авторизировались</div>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    )

    const [isClicked, setIsClicked] = useState(false);

    const handleToggleClick = () => {
        setIsClicked(!isClicked);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const profileData = localStorage.getItem('profileData');
    const profileDataJson = profileData && JSON.parse(profileData);
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';

    const [types, setTypes] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typesData = await fetchTypes();
                setTypes(typesData);
            } catch (error) {
                console.error('Ошибка при получении типов продуктов:', error);
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (type: any) => {
        navigate(`/catalog/${type.name}`);
        // window.location.reload();
    };

    let [cartOpen, setCartOpen] = useState(false);

    const cartItems = useSelector((state: { cartItems: any[] }) => state.cartItems);
    console.log("123" + cartItems)

    return (
        <nav>
            <NavLink to="/" className="LinkClass">
            <svg xmlns="http://www.w3.org/2000/svg" width="82" height="40" fill="none"
                 viewBox="0 0 82 40">
                <path fill="#FFD43D" d="M73.365 19.71c0 2.904-2.241 5.31-5.27
                5.31-3.03 0-5.228-2.406-5.228-5.31 0-2.905 2.199-5.312
                5.228-5.312s5.27 2.407 5.27 5.311Z"></path>
                <path fill="#FF0C81" d="M48.764 19.544c0 2.946-2.323
                5.145-5.27 5.145-2.904 0-5.227-2.2-5.227-5.145 0-2.947 2.323-5.104
                5.228-5.104 2.946 0 5.27 2.158 5.27 5.104Z"></path>
                <path fill="#11EEFC" d="M20.074 25.02c3.029 0 5.27-2.406
                5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228
                5.311 0 2.905 2.199 5.312 5.228 5.312Z"></path>
                <path fill="#171A26" d="M68.095 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934
                4.855-10.83 11.12-10.83 6.349 0 11.162 4.938 11.162 10.83 0 5.975-4.855
                10.871-11.162 10.871Zm0-5.52c3.03 0 5.27-2.406
                5.27-5.31 0-2.905-2.24-5.312-5.27-5.312-3.029 0-5.228 2.407-5.228
                5.311 0 2.905 2.199 5.312 5.228 5.312ZM43.08
                40c-4.813 0-8.506-2.116-10.373-5.934l4.896-2.655c.913 1.784 2.614
                3.195 5.394 3.195 3.486 0 5.85-2.448
                5.85-6.473v-.374c-1.12 1.411-3.111 2.49-6.016 2.49-5.768 0-10.373-4.481-10.373-10.581 0-5.934
                4.813-10.788 11.12-10.788 6.431 0 11.162 4.605 11.162 10.788v8.299C54.74 35.27 49.76 40 43.08
                40Zm.415-15.311c2.946 0 5.27-2.2 5.27-5.145 0-2.947-2.324-5.104-5.27-5.104-2.905 0-5.228 2.158-5.228
                5.104s2.323 5.145 5.228 5.145ZM20.074 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934
                4.854-10.83 11.12-10.83 6.348 0 11.162 4.938 11.162 10.83 0
                5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.029 0
                5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199
                5.312 5.228 5.312ZM0 0h5.892v30H0V0ZM82 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg>
                </NavLink>
            <div>
                <ul id="navbar"
                className={isClicked ?
                "#navbar active" : "navbar"}>
                    <li>
                        <NavLink to="/" className="LinkClass">Main</NavLink>
                    </li>
                    <li>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Каталог
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {types.map((type, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleItemClick(type)}>
                                        {type.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    {!isLoggedIn && (
                        <li>
                            <NavLink to={REGISTRATION_ROUTE} className="LinkClass">Registration</NavLink>
                        </li>
                    )}
                    {/*{isLoggedIn && (*/}
                    {/*    <li>*/}
                    {/*        <NavLink to="/profile" className="LinkClass">{username}</NavLink>*/}
                    {/*    </li>*/}
                    {/*)}*/}

                    {isLoggedIn && (
                        <FaShoppingCart
                            onClick={() => setCartOpen(!cartOpen)}
                            className={`shop-cart-button ${cartOpen && 'active'}`}
                        />
                    )}

                    {cartOpen && (
                        <div className='shop-cart'>
                            <ShoppingCart cartItems={cartItems} />
                        </div>
                    )}

                    {isLoggedIn && (
                        <li className="user-profile" onClick={handleToggleDropdown}>
                            <span className="username">{username}</span>
                            {isDropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to="/profile" className="LinkClass" style={{marginLeft: -15}}>Профиль</NavLink>
                                    </li>
                                    <li>
                                        <button onClick={() => dispatch(logoutUser())}>Logout</button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                    {/*{isLoggedIn && (*/}
                    {/*    <li>*/}
                    {/*        <button onClick={() => dispatch(logoutUser())}>Logout</button>*/}
                    {/*    </li>*/}
                    {/*)}*/}
                </ul>
            </div>

            <div id="mobile">
                <i
                    id="bar"
                    className=
                        {isClicked ?
                            "fas fa-times" :
                            "fas fa-bars"}
                    onClick={handleToggleClick}
                ></i>
            </div>
        </nav>
    );
};

export default Header;