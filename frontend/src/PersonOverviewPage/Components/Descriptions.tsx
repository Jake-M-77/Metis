import { useEffect, useState } from "react";
import { getPersonDescriptions } from "../../services/personService";
import { useParams } from "react-router-dom";
import type { PersonDescriptions } from "../../types/personDescriptions";


function Description() {

    const userId = useParams();

    const [personDescriptions, setPersonDescriptions] = useState<PersonDescriptions[]>([]);

    useEffect(() => {

        async function loadPersonDescriptions() {
            try {
                const res = await getPersonDescriptions(`${userId.id}`);

                console.log(res);

            setPersonDescriptions(res);
            } catch (error) {
                console.error("Unable to load personDescriptions", error);
            }
            
        }

        loadPersonDescriptions();

    }, [userId.id])

    if (personDescriptions.length == 0) {
       return(<>
       
       <div className="text-text-primary text-center pt-8 text-3xl">No Descriptors</div>
       
       </>) 
    }

    return (<>

        
        


        <div className="w-full">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-2/12">Descriptor Type</th>
                        <th className="border-2 w-3/12">Description</th>
                        <th className="border-2 w-2/12">Entered By</th>
                        <th className="border-2 w-1/12">CreatedAt</th>
                        <th className="border-2 w-1/12">UpdatedAt</th>
                        <th className="border-2 w-3/12">Image</th>

                    </tr>
                </thead>

                <tbody>

                    {personDescriptions.map((description) =>
                        <tr className="border-2" key={`${description.id}`}>

                            <td className="border-r text-text-primary ">{description.descriptorType}</td>
                            <td className="border-r text-text-primary ">{description.description}</td>
                            <td className="border-r text-text-primary ">{description.enteredBy}</td>
                            <td className="border-r text-text-primary text-wrap ">{description.createdAt.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap ">{description.updatedAt.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap "><a href={description.imageURL} target="_blank"><img className="h-48" src={description.imageURL} alt={description.description}/></a></td>



                        </tr>

                    )}
                </tbody>


            </table>

        </div>

    </>)
}

export default Description;