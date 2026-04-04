import { NavLink } from "react-router-dom";


function Navbar() {


    return(<>
    
        <nav className="border-4 bg-base">

            <p className="inline-block text-3xl w-48 text-center mr-8 border-4 border-bg-surface rounded-xl text-text-primary">METIS</p>

            <ul className="bg-surface inline-flex flex-wrap list-none gap-8 text-2xl">
                <li className="bg-surface border-4 rounded-xl p-1 m-1  text-text-primary hover:text-primary-hover active:text-primary-active"><NavLink to="/">Home</NavLink></li>
                <li className="bg-surface border-4 rounded-xl p-1 m-1  text-text-primary hover:text-primary-hover active:text-primary-active"><NavLink to="/search">Search</NavLink></li>
                <li className="bg-surface border-4 rounded-xl p-1 m-1  text-text-primary hover:text-primary-hover active:text-primary-active"><NavLink to="/person">Person</NavLink></li>
                
                
            </ul>

        </nav>

    
    </>)

}


export default Navbar;