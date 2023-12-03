import React from 'react';
import Login from "./Components/Login";
import {IRootState, useAppDispatch} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/auth/actionCreators";

const Main = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.access_token
    );

    const renderProfile = () => (
        <div>
            <div>Вы успешно авторизировались</div>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    )

    return (
        <div>
            <h1>Main</h1>
            {isLoggedIn ?  renderProfile(): ""}
        </div>
    );
};

export default Main;