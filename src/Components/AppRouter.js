import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from "./routes";
import Auth from "../pages/Auth";

const AppRouter = () => {
    const isAuth = false;
    return (
        <div>
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
            </Routes>
        </div>
    );
};

export default AppRouter;