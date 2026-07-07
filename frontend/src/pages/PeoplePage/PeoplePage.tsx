import { useEffect, useState } from "react";
import PeoplePageCard from "./Components/PeoplePageCard";
import { getPersonAssociations } from "../../services/personAssociationService";
import { useParams } from "react-router-dom";
import { PersonAssociation } from "../../types/personAssociation";
import { getBatchCustodyImages } from "../../services/batchCustodyImageService";


import metisLoadingImage from "../../assets/METISLoadingImage.png"



function PeoplePage() {

    const userId = useParams();

    const [associations, setAssociations] = useState<PersonAssociation[]>([]);
    const [loading, setLoading] = useState(true);
    const [batchCustodyImages, setBatchCustodyImages] = useState<Record<string, string>>();


    useEffect(() => {
        async function load(id:string) {

            const data = await getPersonAssociations(id);
            setAssociations(data);


            const personIds: string[] = [];
            data.forEach(element => {
                personIds.push(element.person.id);
            });


            const batchImages = await getBatchCustodyImages(personIds);
            setBatchCustodyImages(batchImages);


            setLoading(false);            
        }


        load(`${userId.id}`);



    }, []);

    return (<>

        <h1 className="flex justify-center text-text-primary text-3xl pb-8">People Page</h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">

            {associations.map((assoc) => (
                <PeoplePageCard
                key={assoc.person.id}
                association={assoc}
                imageURL={batchCustodyImages ? batchCustodyImages?.[`${assoc.person.id}`] : metisLoadingImage} 
                />
            ))}

        </div>

    </>)
}


export default PeoplePage;