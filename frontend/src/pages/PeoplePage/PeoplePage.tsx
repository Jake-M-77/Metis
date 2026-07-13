import { useEffect, useState } from "react";
import PeoplePageCard from "./Components/PeoplePageCard";
import { getPersonAssociations } from "../../services/personAssociationService";
import { useParams } from "react-router-dom";
import { PersonAssociation } from "../../types/personAssociation";
import { getBatchCustodyImages } from "../../services/batchCustodyImageService";


import metisLoadingImage from "../../assets/METISLoadingImage.png"
import { custodyImageCache } from "../../cache/imageCache";



function PeoplePage() {

    const userId = useParams();

    const [associations, setAssociations] = useState<PersonAssociation[]>([]);
    const [loading, setLoading] = useState(true);
    const [batchCustodyImages, setBatchCustodyImages] = useState<Record<string, string>>();
    const [imageServiceFailed, setImageServiceFailed] = useState(false);


    useEffect(() => {
        async function load(id: string) {

            const personIds: string[] = []; /// chnage this to const, next session

            try {
                const data = await getPersonAssociations(id);
                setAssociations(data);

                data.forEach(element => {
                    personIds.push(element.person.id);
                });
            } catch (error) {
                console.log("Failed to load person associations:", error);
            }

            const missingIds: string[] = [];
            const cachedImages: Record<string, string> = {};

            const ImagesAPIResponse: Record<string, string> = {};

            personIds.forEach(id => {
                const batchImage = custodyImageCache.get(id)

                if (!batchImage) {
                    missingIds.push(id)
                }
                else {
                    cachedImages[id] = batchImage
                }
            })

            console.log("MISSING IDS:", missingIds);
            console.log("CACHE:", custodyImageCache);


            if (personIds.length > 0 && missingIds.length > 0) {
                try {




                    const batchImages = await getBatchCustodyImages(missingIds);

                    Object.entries(batchImages).forEach(([id, imageUrl]) => {
                        ImagesAPIResponse[id] = imageUrl
                        custodyImageCache.set(id, imageUrl);

                        // if (!Object.hasOwnProperty(missingIds.forEach(id => {}))) {
                        //     custodyImageCache.set(id, "NO_IMAGE")
                        // }

                        missingIds.forEach(id => {
                            const keyExists = custodyImageCache.get(id)

                            if(!keyExists)
                            {
                                custodyImageCache.set(id, "NO_IMAGE")
                            }
                        })

                    })

                    console.warn(batchImages);

                    console.log("API USED")

                } catch (error) {
                    setImageServiceFailed(true);
                    console.error("Failed to laod custody images:", error);
                }
            }

            const finalState: Record<string, string> = {};

            Object.entries(cachedImages).forEach(([id, imageUrl]) => {
                finalState[id] = imageUrl
            })

            Object.entries(ImagesAPIResponse).forEach(([id, imageUrl]) => {
                finalState[id] = imageUrl
            })


            setBatchCustodyImages(finalState);

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