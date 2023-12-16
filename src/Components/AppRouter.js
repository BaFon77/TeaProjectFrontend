import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from "./routes";
import Auth from "../pages/Auth";
import CategoryProducts from "./CategoryProducts";

const AppRouter = () => {
    const isAuth = false;
    return (
        <div>
            <Routes>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                <Route path="/catalog/Индокитай" element={<CategoryProducts/>} />
            </Routes>
        </div>
    );
};

export default AppRouter;