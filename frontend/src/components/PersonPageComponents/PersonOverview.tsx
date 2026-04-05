


function PersonOverview() {


    return (
        <>

            {/* This will use React router */}


            {/* TOP NAV */}
            <div className="h-12 border-b border-border-default flex items-center gap-4 px-4">
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Overview</button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Warning Markers</button>
                <button className="bg-btn-default border-r p-2 rounded-s text-text-primary hover:bg-btn-default-hover">Bail Conditions</button>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex h-[calc(100vh-3rem)]">

                <div className="flex min-w-0 relative">

                    {/* LEFT SIDE (everything except image) */}
                    <div className="flex-1 p-2 overflow-auto">

                        <aside className="w-[55vw] border-r border-b border-border-default">
                            <p className="text-text-primary text-3xl border-b m-2">FirstName:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Surname:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Date Of Birth:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Last Known Address:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Telephone Number:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Email Address:</p>
                            <p className="text-text-primary text-3xl border-b m-2">PNC ID:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Sex:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Height:</p>
                            <p className="text-text-primary text-3xl border-b m-2">Ethnicity:</p>
                            <p className="text-text-primary text-3xl border-b m-2 text-wrap">Alias Details: </p>
                            <p className="text-text-primary text-3xl border-b m-2">Managed By:</p>


                        </aside>
                        {/* Immediate info ** Info regarding the person like OCG or stating that they are in detention** */}
                        <h2 className="text-danger text-3xl my-6">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit...
                        </h2>

                    </div>

                    {/* RIGHT SIDE (IMAGE ONLY) */}
                    <div className="w-2 flex justify-center pt-12 pl-2 items-start lg:w-[300px]">

                        <a href="https://www.thamesvalley.police.uk/SysSiteAssets/media/images/thames-valley/about-us/rebrand/tvp-new-crest-250.png?crop=(0,0,1024,1024)&w=1024&h=1024&scale=both&mode=max"
                        target="__blank">

                        <img
                            className="w-32 h-32 object-cover border-4 rounded-3x lg:w-[300px] h-[300px]"
                            src="https://www.thamesvalley.police.uk/SysSiteAssets/media/images/thames-valley/about-us/rebrand/tvp-new-crest-250.png?crop=(0,0,1024,1024)&w=1024&h=1024&scale=both&mode=max"
                            alt="personimg"
                        
                        />

                       </a>
                        
                    </div>
                    

                </div>

            </div>
        </>
    )
}


export default PersonOverview;