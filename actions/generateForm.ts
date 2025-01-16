"use server";

import db from "@/db";
import { FormSchema } from "@/schema/FormSchema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateForm = async (prevState: unknown, formData: FormData) => {
    console.log('Entered Generate Form server action')
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }
    console.log("Above form validation")
    console.log("Form Data: ",formData)
    const validatedData = FormSchema.safeParse({
      description: formData.get("description") as string,
    });
    console.log(validatedData)
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: validatedData.error.errors,
      };
    }
    console.log("Form validated")
    const description = validatedData.data.description;

    if (!process.env.GEMINI_API_KEY) {
      return { success: false, message: "GEMINI api key not found" };
    }
    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
{
  "formTitle": "string", 
  "formFields": [       
    {
      "label": "string",
      "name": "string",  
      "placeholder": "string"
    }
  ]
}
Requirements:
- Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
- Always include at least 3 fields in the "formFields" array.
- Keep the field names consistent across every generation for reliable rendering.
- Provide meaningful placeholder text for each field based on its label.
        `;

    const tunedPrompt = description + "   " + prompt;
    const completion = await model.generateContent(tunedPrompt);
    // console.log("Completion: ",completion.response.candidates![0].content.parts[0].text)
    //@ts-ignore
    const response = completion.response.candidates![0].content.parts[0].text.trim();
    if (!response) {
      return { success: false, message: "Failed to generate form content" };
    }


    let parsedResponse;
    const updated = response.replace(/^```json\n/, '') .replace(/\n```$/, '');  
    console.log(updated)
    try {
      parsedResponse = JSON.parse(updated);
      console.log("parsed Succefully");
      
    } catch (err) {
      console.log("Error parsing JSON", err);
      return {
        success: false,
        message: "Generated form content is not valid JSON",
      };
    }
    
    const form = await db.form.create({
      data: {
        ownerId: user.id,
        content: updated,
      },
    });
    console.log("db operation successful")
    
    revalidatePath('/dashboard/forms')
    return {
      success: true,
      message: "Form generated successfully.",
      data: form,
    };
  } catch (err) {
    console.log("Error generated form", err);
    return {
      success: false,
      message: "An error occured while generating the form",
    };
  }
};
