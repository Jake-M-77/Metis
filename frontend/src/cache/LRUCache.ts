



export class LRUCache<TKey, TValue> 
{

    private cache: Map<TKey, TValue>;
    private maxSize: number;
    

    constructor(maxSize: number)
    {
        this.cache = new Map<TKey, TValue>();
        this.maxSize = maxSize;

        
    }

    get(key: TKey) : TValue | undefined {
        return this.cache.get(key);
    }
    set(key: TKey, value: TValue): void {
        this.cache.set(key, value);
    }
    remove(key: TKey) : void {
        this.cache.delete(key);
    }
    
    getAll() {
        const cachex: Map<TKey, TValue> = new Map;    
    
        this.cache.forEach((TValue, TKey) => {
            cachex.set(TKey, TValue)
        });

        return cachex;
    }
}