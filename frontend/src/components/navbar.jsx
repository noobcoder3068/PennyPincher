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
                    </li>
                    <li>
                        <NavLink to={"/SignIn"}>Sign In/Up</NavLink>
                    </li>
                    <li>

                    </li>
                    <li>
                        <NavLink to={"/Contact"}>Contact</NavLink>
                    </li>
                    <li>
                        
                    </li>
                    <li>
                        <NavLink to={"/About"}>AboutUs</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;