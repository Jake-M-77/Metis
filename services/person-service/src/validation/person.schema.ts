import { z } from "zod"


export const createPersonSchema = z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    birthDate: z.coerce.date(),
    ethnicity: z.string().min(1),
    pncId: z.string().min(1).optional(),
    sex: z.string().min(1)

});

export type CreatePersonInput = z.infer<typeof createPersonSchema>;


export const updatePersonSchema = createPersonSchema.partial();

export type updatePersonInput = z.infer<typeof updatePersonSchema>;
