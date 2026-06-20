import { Link } from "react-router-dom";
import { PersonAssociation } from "../../../types/personAssociation";


function PeoplePageCard({ association }: { association: PersonAssociation}) {

    

    return (<>

    <Link to={`/person/${association.person.id}/overview`}>

        <div className="flex flex-col border ">

            <img
                className="inline-block m-auto w-32 pb-4"
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
                alt="person image">
            </img>

            <div className="grid grid-cols-2 pb-2">
                <p className="text-text-primary">Firstname: </p> <p className="text-text-secondary">{association.person.firstName}</p>
                <p className="text-text-primary">Surname: </p> <p className="text-text-secondary">{association.person.lastName}</p>
                <p className="text-text-primary">Date Of Birth: </p> <p className="text-text-secondary">{association.person.birthDate?.toString().split("T")[0]}</p>
                <p className="text-text-primary">RelationType: </p> <p className="text-text-secondary">{association.relationType}</p>

            </div>

        </div>

        </Link>

    </>)
}

export default PeoplePageCard;