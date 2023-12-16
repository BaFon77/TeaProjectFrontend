import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import {publicRoutes} from "./Components/routes";
import CategoryProducts from "./Components/CategoryProducts";

function App() {
  return (
    <Router>
        <Header/>
        <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="/" element={<Main/>}></Route>
            <Route path="/Dashboard" element={<Dashboard/>}></Route>
            <Route path="/catalog/:category" Component={CategoryProducts} />
        </Routes>
        <Footer/>
    </Router>
  );
}

export default App;
