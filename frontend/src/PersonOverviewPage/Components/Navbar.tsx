import { NavLink } from "react-router-dom";



function Navbar(){



    return(<>
    
    <div className="h-12 border-b border-border-default flex items-center gap-2 px-4 overflow-hideen">
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/overview">Overview</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/warningmarkers" >Warning Markers</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/bailconditions" >Bail Conditions</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/descriptions" >Descriptions</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/details" >Alias Details</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/custodyphotos" >Custody Photos</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/Docs" >Document Page</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/info" >Info</NavLink></button>


            </div>
    
    </>)
}

export default Navbar;