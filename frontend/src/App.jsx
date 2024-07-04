import React, { useState } from "react";
import Home from "./components/home";
import SignIn from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import About from "./components/about";
import Display from "./pages/display";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Display" element={<Display /> } />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;