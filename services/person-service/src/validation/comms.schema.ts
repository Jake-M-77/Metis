import { z } from "zod"


export const createCommSchema = z.object({
    contactType: z.string().trim().min(1),
    contactValue: z.string().trim().min(1),
    isPrimary: z.boolean().default(false),
    personId: z.string().uuid() //this causes issues due to me not using a UUID for 
    // record it just uses a string, so whenever testing if not using a UUID will have to knock
    // the UUID bit off
})

export type CreateCommInput = z.infer<typeof createCommSchema>

export const updateCommSchema = createCommSchema.partial();

export type updateCommInput = z.infer<typeof updateCommSchema>