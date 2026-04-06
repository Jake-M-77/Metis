


function WarningMarkers() {



    return (<>

        {/* DUMMY DATA, REPLACE WHEN ADDING LOGIC */}
        <div className="w-full overflow-hidden">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-1.5/12">Occurrence</th>
                        <th className="border-2 w-2/12">Warning Marker</th>
                        <th className="border-2 w-1.5/12">Date</th>
                        <th className="border-2 w-2/12">Entered By</th>
                        <th className="border-2 w-5/12">Description</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-2">
                        <td className="border-r text-text-primary ">x4</td>

                        <td className="border-r text-text-primary ">
                            Weapons <span className="text-danger">**OFFICER SAFETY**</span>
                        </td>

                        <td className="border-r text-text-primary ">06/04/2026</td>

                        <td className="border-r text-text-primary ">SYSTEM</td>

                        <td className="border-r text-text-primary break-words whitespace-normal">
                            DP found to be in possession of multiple weapons when searched, intelligence submitted: 42/IR/900/26
                        </td>
                    </tr>
                </tbody>


            </table>
        </div>

    </>)
}

export default WarningMarkers;