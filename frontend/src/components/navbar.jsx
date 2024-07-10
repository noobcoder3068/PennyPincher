import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return (
        <header>
            <nav>
                <h4>
                    <NavLink to={"/"}>Home</NavLink>
                </h4>
                <ul className="Navbarul">
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