import { connectToDB } from "@/utils/database";
import Tips from "@/models/Tips";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";


interface ParamProps {
    oddType: string;
}

export const GET  = async ({ params } : { params : ParamProps}) => {
    try {
        //if user is logged in or if user has id from payStack
        await connectToDB();
        const slips = await Tips.find({ tipType: params.oddType });
        return new Response(JSON.stringify(slips), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Tip not uploaded yet"), { status: 500 })
    }
}

export const POST  = async (req: any, { params } : { params : ParamProps}) => {
    try {
        await connectToDB();
        const formData = await req.formData();
        const file = formData.get('image') as File;

        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const res = await uploadToCloudinary(fileUri, file.name);
        if(res.success && res.result) {
            const newTips = new Tips({
                imageUrl: res.result.secure_url,
                tipType: params.oddType
            })

            await newTips.save();
            return new Response(JSON.stringify(newTips), { status: 200 });
        } else {
            return new Response("failure to upload", { status: 500})
        }
        //if user is logged in or if user has id from payStack
    } catch (error) {
        return new Response(JSON.stringify("Tip not uploaded yet"), { status: 500 })
    }
 }

 export const DELETE = async ( req:any, {params} : { params : ParamProps}) => {
    try {
        await connectToDB();
        const deletedTip = await Tips.findOneAndDelete({ imageUrl: params.oddType});
    } catch (error) {
        
    }
 }