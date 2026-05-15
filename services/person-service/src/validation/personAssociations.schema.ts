import { z } from "zod"
import { RelationType } from "../generated/prisma/index.js"



export const createPersonAssociationSchema = z.object({

    sourcePersonId: z.string().uuid(),
    targetPersonId: z.string().uuid(),
    relationType: z.nativeEnum(RelationType),
})

export type createPersonAssociationInput = z.infer<typeof createPersonAssociationSchema>

export const updatePersonAssociationSchema = createPersonAssociationSchema.partial();

export type updatePersonAssociationInput = z.infer<typeof updatePersonAssociationSchema>