import { LRUCache } from "./LRUCache";

export const custodyImageCache = new LRUCache<string, string>(5);