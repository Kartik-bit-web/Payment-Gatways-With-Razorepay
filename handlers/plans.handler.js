import { client } from "../database.js"
import { instance } from "../utilities/razorepay.js";
import crypto, { Verify } from "crypto";
import { configDotenv } from "dotenv";

configDotenv()

const PlansRetrive = async (req, res) => {
    const response = await client.connect();
    const result = await response.query("select * from plans where interval='7' ");

    res.render("subscription", {data : result.rows});
}

const PlanHandler = (req, res) => {
    const planeId = req.body
    console.log(planeId)

    instance.subscriptions.create({
        plan_id: planeId.planid,
        customer_notify: 1,
        quantity: 1,
        total_count: 1,
        expire_by: Date.now()+ 100000,
        addons: [
            {
              item: {
                name: "Delivery charges",
                amount: 300,
                currency: "INR"
              }
            }
        ],
          notes: {
            key1: "value3",
            key2: "value2"
          }
    })
    .then((ress) => {
        res.json({ress, result: process.env.ID_KEY})
    })
    .catch((error) => {
        console.log(error)
    })
}

const verifyPlan = async (req, res) => {
    const data = req.body;
    console.log(data)

    const verify = await crypto.createHmac('sha256', process.env.SECRET_KEY);
    verify.update(data.response.razorpay_payment_id + '|' + data.response.razorpay_subscription_id)
    const sign = verify.digest('hex');
    console.log(sign)

    if(sign == data.response.razorpay_signature){
        console.log("Subscription Done")
        res.status(200).json({Message: "Success"})
    }
    else{
        console.log("it was failiure")
    }


}

// const checkplan = (req, res) => {
//     instance.subscriptions.fetch('sub_OvL0oQ0TSm52T9')
//     .then((ress) => {
//         console.log(ress)
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }

export {PlansRetrive, PlanHandler, verifyPlan}