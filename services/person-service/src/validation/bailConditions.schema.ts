import { z } from "zod"
import { ConditionType } from "../generated/prisma/index.js"

export const createBailConditionSchema = z.object({

    conditionType: z.nativeEnum(ConditionType),
    endDate: z.coerce.date().optional().nullable(),
    imposedBy: z.string().min(1),
    description: z.string().min(1),
    personId: z.string().uuid(),
})

export type createBailConditionInput = z.infer<typeof createBailConditionSchema>

export const updateBailConditionSchema = createBailConditionSchema.partial();

export type updateBailConditionInput = z.infer<typeof updateBailConditionSchema>