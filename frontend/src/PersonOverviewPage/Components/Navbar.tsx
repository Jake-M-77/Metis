import { NavLink } from "react-router-dom";



function Navbar(){



    return(<>
    
    <div className="h-12 border-b border-border-default flex items-center gap-2 px-4 overflow-hideen">
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/overview">Overview</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/warningmarkers" >Warning Markers</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover"><NavLink to="/personpage/bailconditions" >Bail Conditions</NavLink></button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Descriptions</button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Alias Details</button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Custody Photos</button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Document Page</button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Info</button>


            </div>
    
    </>)
}

export default Navbar;