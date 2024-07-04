import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return (
        <header>
            <nav>
                <h4>Penny Pincer</h4>
                <ul>
                    <li>
                        <NavLink to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/SignIn"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Register"}>Register</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Contact"}>Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/About"}>About</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;