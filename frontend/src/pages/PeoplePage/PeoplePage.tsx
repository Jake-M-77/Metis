import { useEffect, useState } from "react";
import { getPersonAssociations } from "../../services/personAssociationService";
import { useParams } from "react-router-dom";
import { PersonAssociation } from "../../types/personAssociation";
import { getBatchCustodyImages } from "../../services/batchCustodyImageService";


import { addMissingDataToCache, addNegativeCache, getCachedImages, checkCustodyImageCache } from "../../services/cache/custodyImageCacheService";
import { groupPersonAssociations } from "../../utils/groupPersonAssociations";
import RelationshipCategory from "./Components/RelationshipCategory";



function PeoplePage() {

    const userId = useParams();

    const [groupedAssociations, setGroupedAssociations] = useState<Record<string, PersonAssociation[]>>({});

    const [loading, setLoading] = useState(true);
    const [batchCustodyImages, setBatchCustodyImages] = useState<Record<string, string>>();
    const [imageServiceFailed, setImageServiceFailed] = useState(false);


    useEffect(() => {
        async function load(id: string) {

            const personIds: string[] = [];

            try {
                const data = await getPersonAssociations(id);
       

                setGroupedAssociations(groupPersonAssociations(data));
                console.log(data);


                data.forEach(element => {
                    personIds.push(element.person.id);
                });
            } catch (error) {
                console.log("Failed to load person associations:", error);
            }

            const idsMissingFromCache: Array<string> = await checkCustodyImageCache(personIds);


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

        <div className="grid grid-cols-1 gap-5">

            {Object.entries(groupedAssociations).map((categories) => (
                <RelationshipCategory 
                key={categories[0]}
                categoryAssociations={categories[1]}
                batchCustodyImages={batchCustodyImages}
                imageServiceFailed={imageServiceFailed}
                category={categories[0]}
                />
            ))}

        </div>

    </>)
}


export default PeoplePage;