import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";


function PersonPage() {


    return (
        <>

            {/* This will use React router */}


            {/* TOP NAV */}
            <Navbar />
            <Outlet />
        </>
    )
}


export default PersonPage;