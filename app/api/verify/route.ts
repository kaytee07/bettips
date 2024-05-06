import Refs from "@/models/Reference"
import { connectToDB } from "@/utils/database";

export const POST = async (req: any) => {
    try {
        await connectToDB();
    
        const { reference } = await req.json();
        console.log(reference)
        const existingRef = await Refs.findOne({ ref: reference });
        console.log(existingRef);
        if (existingRef && existingRef.ref) {
            return new Response(JSON.stringify("Reference already exists"), { status: 400 });
        }

        
        const newRef = new Refs({
            ref: reference,
        });

        await newRef.save();
        return new Response(JSON.stringify(newRef), { status: 200 });
    } catch (error) {
        // console.log(error)
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
