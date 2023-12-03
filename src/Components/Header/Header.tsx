import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "../../store";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";

const Header = () => {
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.access_token
    );

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Main</Link>
                </li>
                <li>
                    <Link to={LOGIN_ROUTE}>Login</Link>
                </li>
                <li>
                    <Link to={REGISTRATION_ROUTE}>Registry</Link>
                </li>
                {isLoggedIn && (
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;