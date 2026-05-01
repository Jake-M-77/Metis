import { z } from "zod"

export const createPersonAliasSchema = z.object({

    aliasName: z.string().min(1),
    aliasDob: z.coerce.date().optional().nullable(),
    notes: z.string().optional(),
    enteredBy: z.string().min(1),
    personId: z.string().uuid(),

})

export type createPersonAliasInput = z.infer<typeof createPersonAliasSchema>

export const updatePersonAliasSchema = createPersonAliasSchema.partial();

export type updatePersonAliasInput = z.infer<typeof updatePersonAliasSchema>