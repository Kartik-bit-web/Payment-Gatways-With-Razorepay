import express from "express";
import { Create, VerifyPayment, UpdateOrder } from "../handlers/orders.handler.js";
import cors from "cors";

const routerPay = express.Router();
routerPay.use(cors())

routerPay.route('/create_order').post(Create);
routerPay.route('/VerifyPayment').post(VerifyPayment);
// routerPay.route('/payment-success').get(PaymentSuccess);
routerPay.route('/updateOrder').get(UpdateOrder)

export {routerPay}