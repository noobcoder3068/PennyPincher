import React, { useState } from "react";
import Home from "./home";
import SignIn from "./login";
import Register from "./register";
import Footer from "./footer";

function App() {
    const [showHome, setShowHome] = useState(true);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const goToSignIn = () => {
        setShowHome(false);
        setShowSignIn(true);
    };

    const goToRegister = () => {
        setShowHome(false);
        setShowRegister(true);
    };

    const handleSignIn = () => {
        setIsLoggedIn(true);
        setShowHome(true);
        setShowSignIn(false);
        setShowRegister(false);
    };

    const handleRegister = () => {
        setShowHome(true);
        setShowSignIn(false);
        setShowRegister(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowHome(true);
    };

    return (
        <div>
            {showHome && (
                <Home
                    goToSignIn={goToSignIn}
                    goToRegister={goToRegister}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                />
            )}
            {showSignIn && <SignIn handleSignIn={handleSignIn} handleRegister={handleRegister} />}
            {showRegister && <Register handleRegister={handleRegister} />}
            <Footer />
        </div>
    );
}

export default App;
