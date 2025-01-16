"use server"

import db from "@/db"
import { FormSchema } from "@/schema/FormSchema";
import { currentUser } from "@clerk/nextjs/server"
import openAI, { OpenAI } from "openai"

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY!})
export const generateForm = async(prevState:unknown,formData:FormData) => {
    try{
        const user = await currentUser();
        if(!user){
            return {success:false,message:"User not found"}
        }

        const validatedData = FormSchema.safeParse(formData);
        if(!validatedData.success){
            return {success:false,message:"Invalid form data",error:validatedData.error.errors}
        }
        const description = validatedData.data.description;

        if(!process.env.OPENAI_API_KEY){
            return  {success:false,message:"OPENAI api key not found"}
        }
        const prompt = "Create a json form with the following fields: title, fields(If any field include options then keep it inside array not object), button"

        

    }catch(err){

    }
}