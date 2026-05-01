import { z } from "zod"
import { DescriptorType } from "../generated/prisma/index.js"

export const createPersonDescriptionSchema = z.object({


    descriptorType: z.nativeEnum(DescriptorType),
    description: z.string().min(1),
    imageURL: z.string().min(1),
    enteredBy: z.string().min(1),
    updatedAt: z.coerce.date(),
    personId: z.string().uuid(),

})

export type createPersonDescriptionInput = z.infer<typeof createPersonDescriptionSchema>

export const updatePersonDescriptionSchema = createPersonDescriptionSchema.partial();

export type updatePersonDescriptionInput = z.infer<typeof updatePersonDescriptionSchema>