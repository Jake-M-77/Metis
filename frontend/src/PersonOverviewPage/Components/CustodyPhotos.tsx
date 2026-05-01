import { useParams } from "react-router-dom";
import type { CustodyPhoto } from "../../types/custodyPhoto";
import { useEffect, useState } from "react";
import { getPersonCustodyPhotos } from "../../services/personService";


function CustodyPhotos(){


    const userId = useParams();

    const [custodyPhotos, setCustodyPhotos] = useState<CustodyPhoto[]>([]);

    useEffect(() => {

        async function loadPersonAliases() {
            try {
                const res = await getPersonCustodyPhotos(`${userId.id}`);

                console.log(res);

                setCustodyPhotos(res);
            } catch (error) {
                console.error("Unable to load person aliases", error);
            }

        }

        loadPersonAliases();

    }, [userId])

    if (custodyPhotos.length == 0) {
        return (<>

            <div className="text-text-primary text-center pt-8 text-3xl">No Custody Photos</div>

        </>)
    }

    return (<>





        <div className="w-full">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-5/12">Notes</th>
                        <th className="border-2 w-1/12">Uploaded By</th>
                        <th className="border-2 w-1/12">Date Taken</th>
                        <th className="border-2 w-1/12">Created At</th>
                        <th className="border-2 w-4/12">Custody Photo</th>

                    </tr>
                </thead>

                <tbody>

                    {custodyPhotos.map((photo) =>
                        <tr className="border-2" key={`${photo.id}`}>

                            <td className="border-r text-text-primary ">{photo.notes}</td>
                            <td className="border-r text-text-primary ">{photo.uploadedBy}</td>
                            <td className="border-r text-text-primary ">{photo.dateTaken.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap ">{photo.createdAt.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap "><a href={photo.imageUrl} target="_blank"><img className="h-48" src={photo.imageUrl} alt={photo.notes}/></a></td>




                        </tr>

                    )}
                </tbody>


            </table>

        </div>

    </>)
}

export default CustodyPhotos;