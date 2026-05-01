
import { z } from "zod"




export const createPersonInfoSchema = z.object({

    recordCreatedBy: z.string().min(1),
    sourceSystem: z.string().min(1),
    lastModifiedBy: z.string().min(1),
    lastModifiedDate: z.coerce.date(),
    changeNotes: z.string().nullable().optional(),
    personId: z.string().uuid(),

})

export type createPersonInfoInput = z.infer<typeof createPersonInfoSchema>

export const updatePersonInfoSchema = createPersonInfoSchema.partial();

export type updatePersonInfoInput = z.infer<typeof updatePersonInfoSchema>