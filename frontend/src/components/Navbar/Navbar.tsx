import { NavLink } from "react-router-dom";


function Navbar() {


    return (<>

        <nav className="border-2 border-border-default bg-elevated">

            <p className="inline-block text-3xl w-48 text-center mr-8 border-r  text-text-primary">METIS</p>

            <ul className=" inline-flex flex-wrap list-none gap-2 text-2xl">
                <li className="text-text-primary p-1 m-1 pr-3 border-r rounded-s hover:bg-btn-default-hover "><NavLink to="/">Home</NavLink></li>
                <li className="text-text-primary p-1 m-1 pr-3 border-r rounded-s hover:bg-btn-default-hover"><NavLink to="/search">Search</NavLink></li>
                <li className="text-text-primary p-1 m-1 pr-3 border-r rounded-s hover:bg-btn-default-hover"><NavLink to="/person">Person</NavLink></li>


            </ul>

        </nav>


    </>)

}


export default Navbar;