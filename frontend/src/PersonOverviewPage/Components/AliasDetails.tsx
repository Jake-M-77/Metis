import { useParams } from "react-router-dom";
import type { PersonAlias } from "../../types/personAlias";
import { getPersonAliases } from "../../services/personService";
import { useEffect, useState } from "react";


function AliasDetails() {


    const userId = useParams();

    const [personAliases, setPersonAliases] = useState<PersonAlias[]>([]);

    useEffect(() => {

        async function loadPersonAliases() {
            try {
                const res = await getPersonAliases(`${userId.id}`);

                console.log(res);

                setPersonAliases(res);
            } catch (error) {
                console.error("Unable to load person aliases", error);
            }

        }

        loadPersonAliases();

    }, [userId])

    if (personAliases.length == 0) {
        return (<>

            <div className="text-text-primary text-center pt-8 text-3xl">No Aliases</div>

        </>)
    }

    return (<>





        <div className="w-full">
            <table className="mt-4 w-full table-fixed">

                <thead>
                    <tr className="border-2 text-text-primary">
                        <th className="border-2 w-2.5/12">Alias Name</th>
                        <th className="border-2 w-2.5/12">Alias DOB</th>
                        <th className="border-2 w-4/12">Alias Notes</th>
                        <th className="border-2 w-1/12">Entered By</th>
                        <th className="border-2 w-1/12">Date Recorded</th>
                        <th className="border-2 w-1/12">Date Created</th>

                    </tr>
                </thead>

                <tbody>

                    {personAliases.map((alias) =>
                        <tr className="border-2" key={`${alias.id}`}>

                            <td className="border-r text-text-primary ">{alias.aliasName}</td>
                            <td className="border-r text-text-primary ">{alias.alaisDob}</td>
                            <td className="border-r text-text-primary ">{alias.notes}</td>
                            <td className="border-r text-text-primary text-wrap ">{alias.enteredBy}</td>
                            <td className="border-r text-text-primary text-wrap ">{alias.dateRecorded.split("T")[0]}</td>
                            <td className="border-r text-text-primary text-wrap ">{alias.createdAt.split("T")[0]}</td>




                        </tr>

                    )}
                </tbody>


            </table>

        </div>

    </>)
}

export default AliasDetails;