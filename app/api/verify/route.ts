import Refs from "@/models/Reference"
import { connectToDB } from "@/utils/database";

export const POST = async (req: any) => {
    try {
        await connectToDB();

        const { reference } = await req.json();
        const existingRef = await Refs.findOne({ ref: reference });

        if (existingRef) {
            return new Response(JSON.stringify("Reference already exists"), { status: 201 });
        }

        const newRef = new Refs({
            ref: reference,
        });

        await newRef.save();
        return new Response(JSON.stringify(newRef), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};
