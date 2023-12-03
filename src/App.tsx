import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {publicRoutes} from "./Components/routes";

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
        </Routes>
    </Router>
  );
}

export default App;
