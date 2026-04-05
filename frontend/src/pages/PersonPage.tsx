import PersonOverview from "../components/PersonPageComponents/PersonOverview";


function PersonPage() {


    return (<>


        {/* This will use ReactRouter */}

        <div className="flex h-screen">

            <aside className="w-64 border-r border-border-default bg-elevated">

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