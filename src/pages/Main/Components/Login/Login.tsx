import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../../store";
import {loginUser, registryUser} from "../../../../store/auth/actionCreators";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../../utils/consts";

const Login = () => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        {isLogin ? dispatch(loginUser({ username, password })) :
            dispatch(registryUser({ username, password, email }))}
    };

    const location = useLocation();

    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <div>
            {/*<form onSubmit={handleSubmit}>*/}
            {/*<form>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="login">Login:</label>*/}
            {/*        <input*/}
            {/*            name="login"*/}
            {/*            type="text"*/}
            {/*            value={username}*/}
            {/*            onChange={(e) => setUsername(e.target.value)}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label htmlFor="password">Password:</label>*/}
            {/*        <input*/}
            {/*            name="password"*/}
            {/*            type="password"*/}
            {/*            value={password}*/}
            {/*            onChange={(e) => setPassword(e.target.value)}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <button>Submit</button>*/}


                <Container
                    className="d-flex justify-content-center align-items-center"
                    style={{height: window.innerHeight - 54}}
                >
                    <Card style={{width: 600}} className="p-5">
                        <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш username..."
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            {
                                isLogin ? null
                                    :
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите ваш email..."
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                            }
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                                {isLogin ?
                                    <div>
                                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                    </div>
                                    :
                                    <div>
                                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                    </div>
                                }
                                <Button
                                    variant={"outline-success"}
                                    type={"submit"}
                                >
                                    {isLogin ? 'Войти' : 'Регистрация'}
                                </Button>
                            </Row>

                        </Form>
                    </Card>
                </Container>
            {/*</form>*/}
        </div>
    );
};

export default Login;