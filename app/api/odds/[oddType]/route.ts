import { connectToDB } from "@/utils/database";
import Tips from "@/models/Tips";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import cloudinary from "@/utils/cloudinary";


interface ParamProps {
    oddType: string;
}

export const GET  = async (req: any, { params } : { params : ParamProps}) => {
    try {
        //if user is logged in or if user has id from payStack
        let oddType = params.oddType.replace(" ", "");
        await connectToDB();
        const slips = await Tips.find({ tipType: oddType });
        return new Response(JSON.stringify(slips), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Tip not uploaded yet"), { status: 500 })
    }
}

export const POST  = async (req: any, { params } : { params : ParamProps}) => {
    try {
        await connectToDB();
        let oddType = params.oddType.replace(" ", "");
        console.log(oddType)
        const formData = await req.formData();
        const file = formData.get('image') as File;


        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const res = await uploadToCloudinary(fileUri, file.name);
        console.log(res);
        if(res.success && res.result) {
            const newTips = new Tips({
                filename: file.name,
                publicId: res.result.public_id,
                imageUrl: res.result.secure_url,
                tipType: oddType
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
        const { imageUrl } = await req.json();
        await connectToDB();
        const tipToDelete = await Tips.findOne({ imageUrl });
        console.log(tipToDelete.publicId);
        cloudinary.uploader.destroy(tipToDelete.publicId, async (error: any, result: any) => {
            if (error) {
                console.error('Error deleting asset:', error);
            } else {
                await Tips.findOneAndDelete({ imageUrl });
                console.log('Asset deleted successfully:', result);

            }
        });
        
        new Response( JSON.stringify("deleted successfully"), { status: 200 });
    } catch (error) {
        new Response("unable to delete image", { status: 500 });
    }
 }