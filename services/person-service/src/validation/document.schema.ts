import { z } from "zod"
import { DocumentType } from "../generated/prisma/index.js";

export const createDocumentSchema = z.object({

    documentType: z.nativeEnum(DocumentType),
    fileName: z.string().min(1),
    fileUrl: z.string().min(1),
    uploadedBy: z.string().min(1),
    uploadDate: z.coerce.date(),
    expiryDate: z.coerce.date().nullable().optional(),
    notes: z.string().optional().nullable(),
    personId: z.string(),

})

export type createDocumentInput = z.infer<typeof createDocumentSchema>

export const updateDocumentSchema = createDocumentSchema.partial();

export type updateDocumentInput = z.infer<typeof updateDocumentSchema>