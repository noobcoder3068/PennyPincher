import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Forgot from "./pages/forgot";
import NewPass from "./pages/newpass";
import InUp from "./pages/InUp";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import About from "./components/about";
import CanvasAnimation from "./pages/canvas";
import Display from "./display";
import "./app.css"; 

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <CanvasAnimation className="canvas-background" />
        <header>
          <Navbar />
        </header>
        <main className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignIn" element={<InUp />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Forgot-password" element={<Forgot />} />
            <Route path="/:user_id/Display/*" element={<Display />} />
            <Route path="/reset-password/:token" element={<NewPass />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
