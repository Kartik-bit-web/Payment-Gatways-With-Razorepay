import express from "express";
import {client } from "../database.js";
import { instance } from "../utilities/razorepay.js";

const mainrouter = express.Router();

mainrouter.get('/', async (req, res) => {
    res.render('home')
});

// mainrouter.get('/fetching', (req, res) => {
//     instance.orders.fetchPayments("order_OszFjUo1ArtCpJ")
//     .then((result) => {
//         console.log(result)
//         res.send("hii")
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// })

mainrouter.get('/E-commerce-Payment-System', async (req, res) => {
    await client.connect()
    .then(async () => {
        console.log('Connected to PostgreSQL database');
        // Example query to fetch data
        return await client.query('SELECT * FROM products');
    })
    .then((result) => {
        res.render("e_commerce", {data: result.rows})
    })
    .catch((error) => {
        console.error('Error connecting to PostgreSQL database:', error.message);
    })
    .finally(async (client) => {
        if (client) {
            client.release();
            console.log("Database release Sucessfully")
          }
    })
})

export {mainrouter}