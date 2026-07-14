import { useEffect, useState } from "react";
import PeoplePageCard from "./Components/PeoplePageCard";
import { getPersonAssociations } from "../../services/personAssociationService";
import { useParams } from "react-router-dom";
import { PersonAssociation } from "../../types/personAssociation";
import { getBatchCustodyImages } from "../../services/batchCustodyImageService";


import metisLoadingImage from "../../assets/METISLoadingImage.png"
import { custodyImageCache } from "../../cache/imageCache";
import { addMissingDataToCache, addNegativeCache, getCachedImages, checkCustodyImageCache } from "../../services/cache/custodyImageCacheService";



function PeoplePage() {

    const userId = useParams();

    const [associations, setAssociations] = useState<PersonAssociation[]>([]);
    const [loading, setLoading] = useState(true);
    const [batchCustodyImages, setBatchCustodyImages] = useState<Record<string, string>>();
    const [imageServiceFailed, setImageServiceFailed] = useState(false);


    useEffect(() => {
        async function load(id: string) {

            const personIds: string[] = [];

            try {
                const data = await getPersonAssociations(id);
                setAssociations(data);

                data.forEach(element => {
                    personIds.push(element.person.id);
                });
            } catch (error) {
                console.log("Failed to load person associations:", error);
            }

            const idsMissingFromCache: Array<string> = await checkCustodyImageCache(personIds);

            console.log("MISSING IDS:", idsMissingFromCache);
            console.log("CACHE:", custodyImageCache);


            if (personIds.length > 0 && idsMissingFromCache.length > 0) {
                try {

                    const batchImages = await getBatchCustodyImages(idsMissingFromCache);

                    addMissingDataToCache(batchImages);

                    addNegativeCache(idsMissingFromCache);

                    console.warn(batchImages);

                    console.log("API USED")

                } catch (error) {
                    setImageServiceFailed(true);
                    console.error("Failed to load custody images:", error);
                }
            }
            
            setBatchCustodyImages(getCachedImages());

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
                    imageServiceFailed={imageServiceFailed}
                />
            ))}

        </div>

    </>)
}


export default PeoplePage;