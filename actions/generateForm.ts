"use server";

import db from "@/db";
import { FormSchema } from "@/schema/FormSchema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

export const generateForm = async (prevState: unknown, formData: FormData) => {
  console.log("Entered Generate Form server action");

  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const descriptionValue = formData.get("description");
    if (!descriptionValue || typeof descriptionValue !== "string") {
      return { success: false, message: "Description is missing or invalid" };
    }

    const validatedData = FormSchema.safeParse({ description: descriptionValue });
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid form data",
        error: validatedData.error.errors,
      };
    }

    const description = validatedData.data.description;

    if (!process.env.GEMINI_API_KEY) {
      return { success: false, message: "GEMINI API key not found" };
    }

    let genAI;
    try {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    } catch (err) {
      console.error("Error initializing GoogleGenerativeAI:", err);
      return { success: false, message: "Failed to initialize generative AI model" };
    }

    const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
{
  "formTitle": "string", // The title of the form
  "formFields": [        // An array of fields in the form
    {
      "label": "string", // The label to display for the field
      "name": "string",  // The unique identifier for the field (used for form submissions)
      "placeholder": "string" // The placeholder text for the field
    }
  ]
}
Requirements:
- Button !!importnat dont forget this
- Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder , "required" , "type".
- Always include at least 3 fields in the "formFields" array.
- Keep the field names consistent across every generation for reliable rendering.
- Provide meaningful placeholder text for each field based on its label..

Thanks for helping me out Bruh

    Description: "${description}"`;

    const tunedPrompt = prompt.slice(0, 1000);

    let completion;
    try {
      completion = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(tunedPrompt);
    } catch (err) {
      console.error("Error generating content:", err);
      return { success: false, message: "Failed to generate form content" };
    }

    //@ts-ignore
    const response = completion.response.candidates![0].content.parts[0].text.trim();
    if (!response) {
      return { success: false, message: "Generated content is empty" };
    }
    //to get ready for json parsing from markdown text gemini gives in the text format
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      return { success: false, message: "Failed to extract JSON from response" };
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonMatch[1]);
      console.log("Parsed Response:", parsedResponse);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      return { success: false, message: "Generated form content is not valid JSON" };
    }
    let form;

    try {
      form = await db.form.create({
        data: {
          ownerId: user.id,
          content: parsedResponse ,
        },
      });
    } catch (err) {
      console.error("Database error:", err);
      return { success: false, message: "Failed to save the form to the database" };
    }

    revalidatePath("/dashboard/forms");
    return { success: true, message: "Form generated successfully.", data: form };
  } catch (err) {
    console.error("Error generating form:", err);
    return { success: false, message: "An error occurred while generating the form" };
  }
};
