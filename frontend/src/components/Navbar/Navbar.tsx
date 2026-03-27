import { NavLink } from "react-router-dom";


function Navbar() {


    return(<>
    
        <nav>

            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/person">Person</NavLink></li>
            </ul>

        </nav>

    
    </>)

}


export default Navbar;