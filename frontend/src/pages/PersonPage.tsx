import PersonOverview from "../PersonOverviewPage/PersonOverviewPage";


function PersonPage() {


    return (<>


        {/* This will use ReactRouter */}

        <div className="flex h-screen">
            {/* this part has been modified from w-64 to w-36 so that the image (overview image, this is why its been shorted down) and the table for warning markers doesnt overflow on a 1440x900 display. This will need to be resolved when possible. Current temp fix in place **THIS IS NOT PERMANENT** */}
            <aside className="w-36 border-r border-border-default bg-elevated">

                <nav className="flex flex-col gap-2">
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Overview</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">People</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Locations</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Comms</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Vehicles</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Custody</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Intelligence</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Investigations</button>
                    <button className="bg-btn-default text-text-primary text-xl p-2 border-b rounded-lg hover:bg-btn-default-hover active:bg-btn-default-active">Misper Info</button>

                </nav>
            </aside>


            <main className="flex-1 flex flex-col">

                <PersonOverview />


            </main>


        </div>


    </>)
}


export default PersonPage;