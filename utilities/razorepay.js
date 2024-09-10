import Razorpay from "razorpay";
import { configDotenv } from "dotenv";

//Confidantial files init 
configDotenv();

//Razorepay Instance with key and secret
const instance = new Razorpay({
    key_id : process.env.ID_KEY,
    key_secret: process.env.SECRET_KEY
});

export {instance}