import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";


function PersonPage() {


    return (
        <>

        
                <Navbar />
                <Outlet />

        </>
    )
}


export default PersonPage;