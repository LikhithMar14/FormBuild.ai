import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface AiGeneratedFormProps {
    form: any;
    isEditMode: boolean;
}

function AiGeneratedForm({ form, isEditMode }: AiGeneratedFormProps) {
    console.log("form in Ai generated from: ", form);
    console.log("Type of form: ", typeof form);
    console.log("Type of form.formFields: ", form.formFields);
    console.log("Logging items");
    form.formFields.map((item: any) => console.log(item.name));

    return (
        <div className="gap-y-5 gap-x-2">
            <form action="">
                {form.formFields.map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                        <Label>{item.label}</Label>
                        {item.type === "text" ||
                        item.type === "email" ||
                        item.type === "number" ||
                        item.type === "file" ||
                        item.type === "tel" ? (
                            <Input
                                type={item.type}
                                name={item.label}
                                placeholder={item.placeholder}
                                required={!isEditMode && item.required}
                            />
                        ) : item.type === "textarea" ? (
                            <Textarea
                                name={item.label}
                                placeholder={item.placeholder}
                                required={!isEditMode && item.required}
                                className="w-full border rounded resize-none"
                            />
                        ) : item.type === "radio" && item.options ? (
                            <div>
                              {item.options.map((option: any, idx: number) => (
                                <label key={idx} className="mr-4 flex items-center">
                                  <input
                                    type="radio"
                                    name={item.name}
                                    value={option.value}
                                    required={!isEditMode && item.required}
                                    className="px-2 mr-2" // Added margin to the right of the radio button
                                  />
                                  {option.label}
                                </label>
                              ))}
                            </div>
                          )
                           : (
                            <div>
                                <h1 className="text-red-600 text-xl">Error in creating form</h1>
                            </div>
                        )}
                    </div>
                ))}
                <Button type="submit" name="submit">
                    {isEditMode ? "Publish" : form?.button?.label || "Submit"}
                </Button>
            </form>
        </div>
    );
}

export default AiGeneratedForm;
