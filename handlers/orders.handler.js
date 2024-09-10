import { instance } from "../utilities/razorepay.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { quaryData } from "../utilities/database_instance.js";
import { configDotenv } from "dotenv";
// import crypto from "crypto-js";
import crypto from 'crypto'


configDotenv()


const Create = async (req, res) => {
    const x = req.body;
    const idPorducts =  Number(x.result);

    const val = new quaryData(`SELECT * FROM products WHERE id=1`);
    const y = await val.findById();
    
    await instance.orders.create({
        amount: Number(y[0].price),
        currency: "INR",
        receipt: "Receipt Number 1",
        notes: {
            product_name: [y[0].name, y[0].price, y[0].memory, y[0].processor]
        }
    })
    .then(async (result) => {
        await res.json({result, key: process.env.ID_KEY});
    })
    .catch((error) => {
        console.log(error);
    })

}

const VerifyPayment = async (req, res) => {
    const verify = req.body;
    const sign = crypto.createHmac('sha256', process.env.SECRET_KEY);
    sign.update( verify.response.razorpay_order_id + "|" + verify.response.razorpay_payment_id)
    const generatedSignature = sign.digest('hex');
    if( verify.response.razorpay_signature == generatedSignature){
        console.log("Payment Successfull")
        res.status(200).json({message: 'Payment success'})
    }
    else{
        res.status(400).json({message : 'Payment Failed'})
    }
    // console.log(generatedSignature)

    // const vaild = validatePaymentVerification(
    //     {
    //         order_id: verify.response.razorpay_payment_id, 
    //         payment_id: verify.response.razorpay_order_id
    //     },
    //     verify.response.razorpay_signature,
    //     process.env.SECRET_KEY
    // )
    // if(vaild){
    //     console.log("Payment Success")
    //     res.status(200).json({success})
    // }
}

const UpdateOrder = (req, res) =>{
    instance.orders.edit("order_OuNas3ateVo4zq",{
        price: 29900,
        notes:{
            message: "dekh lee badwee"
        }
    })
    .then((ress) => {
        console.log(ress)
        res.status(200).json({message: "done"})
    })
    .catch((error) => {
        console.log(error)
    })
}

export {Create, VerifyPayment, UpdateOrder}