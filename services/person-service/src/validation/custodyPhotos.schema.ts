import { z } from "zod"

export const createCustodyPhotoSchema = z.object({

    imageUrl: z.string().min(1),
    dateTaken: z.coerce.date().optional().nullable(),
    uploadedBy: z.string().min(1),
    notes: z.string().optional().nullable(),
    personId: z.string().uuid(),

})

export type createCustodyPhotoInput = z.infer<typeof createCustodyPhotoSchema>

export const updateCustodyPhotoSchema = createCustodyPhotoSchema.partial();

export type updateCustodyPhotoInput = z.infer<typeof updateCustodyPhotoSchema>