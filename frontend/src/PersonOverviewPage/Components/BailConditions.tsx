import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonBailConditions } from "../../services/personService";
import type { BailCondition } from "../../types/bailCondition";



function BailConditions() {

    const userId = useParams();


    const [bailConditions, setBailConditions] = useState<BailCondition[]>([]);

    useEffect(() => {

        async function loadBailConditions() {

            try {
                const res = await getPersonBailConditions(`${userId.id}`)
                console.log(res); // for debug purpose
                setBailConditions(res);


            } catch (error) {
                console.error("Failed to load bail conditions", error);
            }

        }

        loadBailConditions();

    }, [userId.id])

    if (bailConditions.length == 0) {
       return(<>
       
       <div className="text-text-primary text-center pt-8 text-3xl">No Bail Conditions</div>
       
       </>) 
    }


    return (<>

        {/* removed: overflow-hidden from div className, this is to allow scrolling of BC menu. However, for future this should not be needed as anything that is not active or in breach will
        be in a archive page which will have scroll feature, and/or a dedicated component */}

        <div className="w-full ">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-2/12 text-wrap">Type</th>
                        <th className="border-2 w-2/12">Start Date</th>
                        <th className="border-2 w-2/12">End Date</th>
                        <th className="border-2 w-3/12">Imposed By</th>
                        <th className="border-2 w-7/12">Description</th>

                    </tr>
                </thead>

                <tbody>

                    {bailConditions.map((conditon) =>
                        <tr className="border-2" key={conditon.id}>

                            <td className="border-r text-text-primary text-wrap">{conditon.conditionType.split("_").join(" ")}</td>
                            <td className="border-r text-text-primary ">{conditon.startDate.split("T")[0]}</td>
                            <td className="border-r text-text-primary ">{conditon.endDate && `${conditon.endDate.split("T")[0]}` }</td>
                            <td className="border-r text-text-primary ">{conditon.imposedBy}</td>
                            <td className="border-r text-text-primary text-wrap">{conditon.description}</td>

                        </tr>

                    )}

                </tbody>


            </table>
        </div>

    </>)
}

export default BailConditions;

