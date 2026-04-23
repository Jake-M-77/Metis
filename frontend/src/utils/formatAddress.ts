import type { Address } from "../types/address";



export function handleHomeAddressFormatting(address: Address): string | undefined {

    const base = `${address.streetName}, ${address.townOrCity}, ${address.county}, ${address.postCode}`;

    const house = address.houseName ?? address.houseNumber ?? "";
    const flat = address.flatNumber ?? "";


    switch (address.propertyType) {
        case "HOUSE":
            return `${house}, ${base}`
            break;
        case "FLAT":
            return `${flat}, ${base}`
            break;
        case "HMO":
        case "CARAVAN":
            return `${flat}, ${house}, ${base}`
            break;

        default:
            `ERROR WHEN FORMATTING (ERROR WITHIN formatAddress.ts)`
            break;
    }
}