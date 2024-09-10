import express from 'express';
import { PlansRetrive, PlanHandler, verifyPlan} from '../handlers/plans.handler.js';

const routeplan = express.Router();

routeplan.route('/plans').get(PlansRetrive);
routeplan.route('/planHandler').post(PlanHandler);
routeplan.route('/verifyPlane').post(verifyPlan);



export {routeplan}