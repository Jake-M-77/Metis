import { custodyImageCache } from "../../cache/imageCache";



export const checkCustodyImageCache =  (personIds: Array<string>) => {

    const idsNotFoundInCache: string [] = [];

    personIds.forEach(id => {
        
        const idInCache = custodyImageCache.get(id)

        if(!idInCache)
        {
            idsNotFoundInCache.push(id)
        }

    });

    return idsNotFoundInCache;

}


export const addMissingDataToCache = (apiResponse: Record<string, string>)=> {

    Object.entries(apiResponse).forEach(([id, imageUrl]) => {
        custodyImageCache.set(id, imageUrl);
    })

}

export const addNegativeCache = (idsNotFoundInCache: Array<string>) => {
    idsNotFoundInCache.forEach(id => {
        const keyExists = custodyImageCache.get(id)

        if(!keyExists)
        {
            custodyImageCache.set(id, "NO_IMAGE")
        }
    })
}

export const getCachedImages = () => {

    const imageCache: Record<string, string> = {};

    const cache  = custodyImageCache.getAll();

    cache.forEach((imageUrl, id) => {
        imageCache[id] = imageUrl
    })
    

    return imageCache;

}