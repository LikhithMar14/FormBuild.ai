import AiGeneratedForm from "@/components/AiGeneratedForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db";

const Edit = async ({ params }: { params: Promise<{ id: string }> }) => {
    const formId = (await params).id;

    if (!formId) {
        return <h1>No Form id found</h1>;
    }

    const form: any = await db.form.findUnique({
        where: { id: parseInt(formId) },
    });

    if (!form || !form.content) {
        return <h1>Form not found</h1>;
    }


    const formContent = typeof form.content === "string" ? JSON.parse(form.content) : form.content;

    // Extract formTitle from content
    const { formTitle } = formContent;

    console.log("Fetching the form:", formContent);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1 className="font-bold text-2xl text-center">{formTitle}</h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <AiGeneratedForm form = {formContent} isEditMode = {true}/>
            </CardContent>
        </Card>
    );
};

export default Edit;
