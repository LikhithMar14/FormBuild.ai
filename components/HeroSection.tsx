"use client"
import React, { useState } from "react";
import GenerateFormInput from "./GenerateFormInput";
import { Button } from "./ui/button";

type SuggestionText = {
  label: string;
  text: string;
};

const suggestionBtnText: SuggestionText[] = [
  {
    label: "Job Application",
    text: "Develop a basic job application form that serves as a one-page solution form collecting essential information from applicants.",
  },
  {
    label: "Registration Form",
    text: "Create a course registration form suitable form any scheool or instituition.",
  },
  {
    label: "Feedback Form",
    text: "Create a client feedback form to gather valuable insights from any clients.",
  },
];
const HeroSection = () => {

    const [text , setText] = useState<string>("")
    
    return (
        <section>
          <div className="relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10"></div>
      
            {/* Content Container */}
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold">Build AI-Driven Forms Effortlessly</h1>
              <p className="mt-4 text-lg leading-tight">
                Create AI-powered forms to simplify data collection and improve user experience.
              </p>
            </div>
          </div>
      
          {/* Input and Buttons Section */}
          <div className="container mx-auto mt-10 space-y-6">
            {/* Input Section */}
            <div className="flex justify-center">
              <GenerateFormInput text={text}/>
            </div>
      
            {/* Buttons Section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
              {suggestionBtnText.map((item, index) => (
                <Button onClick={() => setText(item.text)} className="rounded-full h-10" variant={"outline"} key={index}>
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      );
      
};

export default HeroSection;
