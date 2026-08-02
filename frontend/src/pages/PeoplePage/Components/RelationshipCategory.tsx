import { PersonAssociation } from "../../../types/personAssociation";
import metisLoadingImage from "../../../assets/METISLoadingImage.png"
import PeoplePageCard from "./PeoplePageCard";
import { useState } from "react";


function RelationshipCategory({ categoryAssociations, batchCustodyImages, imageServiceFailed, category }: { categoryAssociations: PersonAssociation[], batchCustodyImages: Record<string, string> | undefined, imageServiceFailed: boolean, category: string }) {

    const [isVisible, setIsVisible] = useState(true);

    function toggleCategoryDisplay() {
        setIsVisible(!isVisible)
    }

    return (<>

        <div className="border-2 border-sky">


        <div className="flex justify-between">
            <h1></h1>
            <h1 className=" text-text-primary m-2 text-lg">{category}</h1>
            <button onClick={toggleCategoryDisplay} className="m-2 p-1 text-3xl">{isVisible ? "⬆️" : "⬇️"}</button>
            </div>
            {isVisible &&
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">

                    {categoryAssociations.map((assoc) => (
                        <PeoplePageCard
                            key={assoc.person.id}
                            association={assoc}
                            imageURL={batchCustodyImages ? batchCustodyImages?.[`${assoc.person.id}`] : metisLoadingImage}
                            imageServiceFailed={imageServiceFailed}
                        />
                    ))}

                </div>
            }


        </div>


    </>)


}


export default RelationshipCategory;