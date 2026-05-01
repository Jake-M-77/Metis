import { z } from "zod"
import { MarkerType } from "../generated/prisma/index.js"

export const createWarningMarkerSchema = z.object({
    markerType: z.nativeEnum(MarkerType),
    description: z.string().trim().min(1),
    enteredBy: z.string().trim().min(1),
    personId: z.string().uuid(),
})

export type createWarningMarkerInput = z.infer<typeof createWarningMarkerSchema>

export const updateWarningMarkerSchema = createWarningMarkerSchema.partial();

export type updateWarningMarkerInput = z.infer<typeof updateWarningMarkerSchema>