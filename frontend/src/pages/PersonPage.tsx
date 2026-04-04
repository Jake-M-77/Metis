import PersonOverview from "../components/PersonPageComponents/PersonOverview";


function PersonPage() {


    return (<>


        {/* This will use ReactRouter */}

        <div className="flex h-screen">

            <aside className="w-64 border-r border-bg-surface">

                <nav className="flex flex-col gap-2">
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl ">Overview</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl ">People</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl ">Locations</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl ">Comms</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl ">Vehicles</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl">Custody</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl">Intelligence</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl">Investigations</button>
                    <button className="text-text-primary text-xl p-2 border-2 rounded-xl">Misper Info</button>

                </nav>
            </aside>


            <main className="flex-1 flex flex-col">

                <PersonOverview />


            </main>


        </div>


    </>)
}


export default PersonPage;