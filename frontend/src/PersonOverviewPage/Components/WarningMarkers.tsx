import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonWarningMarkers } from "../../services/personService";
import type { WarningMarker } from "../../types/warningMarker";



function WarningMarkers() {

    const userId = useParams();

    const [warningMarkers, setWarningMarkers] = useState<WarningMarker[]>([]);

    useEffect(() => {
        async function loadWarningMarkers() {

            try {
                const res = await getPersonWarningMarkers(`${userId.id}`)
                console.log(res); // for debug purposes
                setWarningMarkers(res);


            } catch (error) {
                console.error("Failed to load warning markers", error);
            }
        }

        loadWarningMarkers();
    }, [userId])


    return (<>

        <div className="w-full overflow-hidden">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-2/12">Warning Marker</th>
                        <th className="border-2 w-1.5/12">Date</th>
                        <th className="border-2 w-2/12">Entered By</th>
                        <th className="border-2 w-5/12">Description</th>
                    </tr>
                </thead>

                <tbody>

                    {warningMarkers.map((warning) =>
                        <tr className="border-2" key={`${warning.id}`}>

                            <td className="border-r text-text-primary ">{warning.markerType}</td>
                            <td className="border-r text-text-primary ">{warning.dateRecorded.split("T")[0]}</td>
                            <td className="border-r text-text-primary ">{warning.enteredBy}</td>
                            <td className="border-r text-text-primary text-wrap ">{warning.description}</td>

                        </tr>

                    )}
                </tbody>


            </table>

        </div>

    </>)
}

export default WarningMarkers;