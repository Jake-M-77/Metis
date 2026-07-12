import { Link } from "react-router-dom";
import { PersonAssociation } from "../../../types/personAssociation";

import metis404Image from "../../../assets/METIS404Image.png";
import metisLoadingImage from "../../../assets/METISLoadingImage.png";
import metis500Image from "../../../assets/METIS500Image.png"
import { useEffect, useState } from "react";



function PeoplePageCard({ association, imageURL, imageServiceFailed }: { association: PersonAssociation, imageURL: string | undefined, imageServiceFailed: boolean }) {

    const [image, setImage] = useState(metisLoadingImage)

    useEffect(() => {

        if (imageServiceFailed === true) {
            setImage(metis500Image)
        }
        else if (imageURL == undefined) {
            setImage(metis404Image);
        }
        else {
            setImage(imageURL);
        }


    }, [imageURL])

    return (<>

        <Link to={`/person/${association.person.id}/overview`}>

            <div className="flex flex-col border ">

                <img
                    className="inline-block m-auto w-32 pb-4"
                    src={image}
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