import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import engine from 'ejs-mate';
import path from "path";
import { fileURLToPath } from 'url';

 //Routers files 
import { mainrouter } from "./routers/main.router.js";
import { routerPay } from "./routers/routerFirst.js";
import { routeplan } from "./routers/plansSubs.router.js";

const app = express();
const port = 3000;

app.use(cors());

// Define __filename and __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Location of current directory and file
app.use(express.static(path.join(__dirname, 'views/public')));

//For Static files access with view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body-Parser that read incomming request body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// <-----------------------------------ROUTERS HANDLING----------------------------------->

//Home Router
app.use('/', mainrouter);

//Router for Orders where is Create Order, Update Orders, Fatch Orders are exist
app.use('/order', routerPay);

//Router for plan and it's Subscription Handlers 
app.use('/plan-subscriptions', routeplan);


//Listening the port 
app.listen(port, () =>{
    console.log(`Sucessfully Connected to Website in port ${port}`)
});

