import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Forgot from "./pages/forgot";
import NewPass from "./pages/newpass"; 
import InUp from "./pages/InUp";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import About from "./components/about";
import AddGet from './after/AddGet';
import Charts from './after/Graphical';
import Feedback from './after/Feedback';
import SideBar from './after/sidebar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<InUp />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Forgot-password" element={<Forgot />} />
                <Route path="/reset-password/:token" element={<NewPass />} />
                <Route path="/:user_id/Display" element={
                    <>
                    <SideBar />
                    <AddGet />
                    </>
                } />
                <Route path="/:user_id/Display/Charts" element={
                    <>
                    <Charts />
                    <SideBar />
                    </>
                } />
                <Route path="/:user_id/Display/FeedBack" element={
                    <>
                    <Feedback />
                    <SideBar />
                    </>
                } />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
