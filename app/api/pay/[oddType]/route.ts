import Tips from "@/models/Tips";
var paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
import { redirect } from "next/navigation";

interface ParamProps {
    oddType: string;
}

export const POST = async ( req: any, {params} : { params : ParamProps}) => {
    try {
        const getAvailableOdds = await Tips.find({ tipType: params.oddType });
        if(getAvailableOdds.length === 0) new Response(JSON.stringify("games not posted yet"), { status: 400 });
        const { amount } = await req.json();
        console.log(amount)
        let kobo_amount = amount * 100;
        const transaction = await paystack.transaction.initialize({
            email: 'sambrucehubrich@gmail.com',
            amount: kobo_amount,
            callback_url: `http://localhost:3000/tips/${params.oddType}`
        }).then(function(body: any) {
            console.log(body.data)
            redirect(body.data.authorization_url)
            return;
        }).catch(function(error: any) {
            console.log(error)
            return new Response(JSON.stringify(error), { status: 400 })
        });
    } catch (error) {
        console.error(error)
    }
}