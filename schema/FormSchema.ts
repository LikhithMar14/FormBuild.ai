import {z} from "zod"
export const FormSchema = z.object({
    description:z.string().min(1,"Description is required")
})