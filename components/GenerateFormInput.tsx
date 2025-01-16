
"use client"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles } from "lucide-react";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { generateForm } from "@/actions/generateForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



type InitialState = {
    message:string;
    success:boolean;
    data?:any
}

const initialState:InitialState = {
    message:"",
    success:false
}

interface GenerateFormInputProps{
    text ?: string
}


const GenerateFormInput = ({text}:GenerateFormInputProps) => {
    //Action and its initial state
    const [state,formAction] = useActionState(generateForm, initialState)
    const[description,setDescription] = useState<string | undefined>(text)
    const router = useRouter()

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)

    };

    useEffect(() => {
        setDescription(text)
    },[text])
    useEffect(() => {
        if(state.success){
            toast(state.message);
            router.push(`/dashboard/forms/edit/${state.data.id}`)
        }
        else if(state.message){
            toast.error(state.message)
        }
     },[router,state])
    return ( 
        <form action={formAction} className="flex items-center gap-4  w-full ">
            <Input id="description" name = "description" value={description} onChange={onChangeHandler} type="text" placeholder="Write a prompt to generate form..."  className="focus:ring-0 focus:outline-none "/>
            <SubmitButton/>
        </form>
     );


}
 
export default GenerateFormInput;


const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
        <Button type="submit" disabled = {pending} className="h-12 bg-gradient-to-r from-blue-500 to bg-purple-600">
            <Sparkles className="mr-2"/>
            {
                pending ? (<span>Generating form ...</span>):("Generate form")
            }
        </Button>
    )
}