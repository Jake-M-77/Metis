import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPersonDocuments } from "../../services/personService";
import type { PersonDocuments } from "../../types/personDocuments";



function Documents() {


    const userId = useParams();

    const [personDocuments, setPersonDocuments] = useState<PersonDocuments[]>([]);

    useEffect(() => {

        async function loadPersonDocuments() {
            try {
                const res = await getPersonDocuments(`${userId.id}`);

                console.log(res);

                setPersonDocuments(res);
            } catch (error) {
                console.error("Unable to load person documents", error);
            }

        }

        loadPersonDocuments();

    }, [userId])

    if (personDocuments.length == 0) {
        return (<>

            <div className="text-text-primary text-center pt-8 text-3xl">No Person Documents</div>

        </>)
    }

    return (<>





        <div className="w-full">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-1/12">Name</th>
                        <th className="border-2 w-1/12">Uploaded By</th>
                        <th className="border-2 w-1/12">Uploaded Date</th>
                        <th className="border-2 w-1/12">Expiry Date </th>
                        <th className="border-2 w-1/12">Created At</th>
                        <th className="border-2 w-1/12">Notes</th>
                        <th className="border-2 w-2/12">fileUrl</th>

                    </tr>
                </thead>

                <tbody>

                    {personDocuments.map((document) =>
                        <tr className="border-2" key={`${document.id}`}>

                            <td className="border-r text-text-primary ">{document.fileName}</td>
                            <td className="border-r text-text-primary ">{document.uploadedBy}</td>
                            <td className="border-r text-text-primary ">{document.uploadDate.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap ">{document.expiryDate.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap ">{document.createdAt.split("T")[0]}</td>
                            <td className="border-r text-text-primary ">{document.notes}</td>
                            <td className="border-r text-text-primary "><a href={document.fileUrl} target="_blank">{document.fileUrl}</a></td>




                        </tr>

                    )}
                </tbody>


            </table>

        </div>

    </>)
}

export default Documents;