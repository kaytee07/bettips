import Tips from "@/models/Tips";
import { connectToDB } from "@/utils/database";
var paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
import { redirect } from "next/navigation";

interface ParamProps {
    oddType: string;
}

export const POST = async (req: any, { params }: { params: ParamProps }) => {
    try {
        await connectToDB();
        const getAvailableOdds = await Tips.find({ tipType: params.oddType });

        if (getAvailableOdds.length === 0) {
            return new Response(JSON.stringify("games not posted yet"), { status: 404 });
        }

        const { amount } = await req.json();
        const kobo_amount = amount * 100;

        const transaction = await paystack.transaction.initialize({
            email: 'bettips@gmail.com',
            amount: kobo_amount,
            callback_url: `https://bettip.org/tips/${params.oddType}`
        });
        
        const paystackPaymentAPI = transaction.data.authorization_url || "can't get API";

        return new Response(JSON.stringify(paystackPaymentAPI), { status: 200 });
    } catch (error) {
        console.error(error);
    }
};
