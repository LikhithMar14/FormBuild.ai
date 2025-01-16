import { Button } from "./ui/button";
import { Input } from "./ui/input";

const GenerateFormInput = () => {
    return ( 
        <div className="flex items-center gap-4  w-full ">
            <Input type="text" placeholder="Write a prompt to generate form..."  className="focus:ring-0 focus:outline-none "/>
            <Button>Generate Form</Button>
        </div>
     );
}
 
export default GenerateFormInput;