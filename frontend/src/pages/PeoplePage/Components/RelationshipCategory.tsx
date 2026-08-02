import { PersonAssociation } from "../../../types/personAssociation";
import metisLoadingImage from "../../../assets/METISLoadingImage.png"
import PeoplePageCard from "./PeoplePageCard";


function RelationshipCategory({ categoryAssociations, batchCustodyImages, imageServiceFailed, category }: { categoryAssociations: PersonAssociation[], batchCustodyImages: Record<string, string> | undefined, imageServiceFailed: boolean, category: string }) {


    return (<>

        <div className="border-2 border-sky">


            <h1 className="block text-text-primary text-center">{category}</h1>

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


        </div>


    </>)


}


export default RelationshipCategory;