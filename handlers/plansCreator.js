import { client } from '../database.js';

async function PlansCreation({
    period,
    interval,
    item: {
        name,
        amount,
        currency, 
        description
    },
    notes = { subject: 'For Bheekh given product' }
}) {
    try {
        // Create plan using Razorpay instance
        const response = await instance.plans.create({
            period: period,
            interval: interval,
            item: {
                name: name,
                amount: Number(amount) * 100,
                currency: currency,
                description: description
            },
            notes: notes
        });

        // Connect to the database
        await client.connect();
        console.log("Database connected successfully");

        // Prepare SQL query with parameterized inputs
        const query = `INSERT INTO plans (planid, entity, interval, period, name, price) VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [response.id, response.entity, response.interval, response.period, response.item.id, response.item.amount];

        // Execute the query
        const result = await client.query(query, values);
        console.log("Data inserted:", result);

    } catch (error) {
        console.error("An error occurred:", error.message || error);
    } finally {
        // Ensure the client connection is closed properly
        // await client.end();
        console.log("Database connection closed.");
    }
}


// PlansCreation({ period:"daily", interval:7, item:{name: 'Basic Plan', amount: 49, currency: 'INR', description:"Basic plan "} } )
// PlansCreation({ period:"daily", interval:7, item:{name: 'standard Plan', amount: 99, currency: 'INR', description:"Standard plan "} } )
// PlansCreation({ period:"daily", interval:7, item:{name: 'Premium Plan', amount: 149, currency: 'INR', description:"Premium plan "} } )

// PlansCreation({ period:"monthly", interval:1, item:{name: 'Basic Plan', amount: 499, currency: 'INR', description:"Basic plan Monthly wala"} } )
// PlansCreation({ period:"monthly", interval:1, item:{name: 'standard Plan', amount: 799, currency: 'INR', description:"Standard plan Monthly wala"} } )
// PlansCreation({ period:"monthly", interval:1, item:{name: 'Premium Plan', amount: 999, currency: 'INR', description:"Premium plan Monthly wala"} } )

// PlansCreation({ period:"yearly", interval:1, item:{name: 'Basic Plan', amount: 1199, currency: 'INR', description:"Basic plan Yearly "} } )
// PlansCreation({ period:"yearly", interval:1, item:{name: 'standard Plan', amount: 1499, currency: 'INR', description:"Standard plan Yearly " } } )
// PlansCreation({ period:"yearly", interval:1, item:{name: 'Premium Plan', amount: 1999, currency: 'INR', description:"Premium plan Yearly "} } )


// client.connect()
// .then(() => {
//     return client.query('select * from plans')
// })
// .then((ress) => {
//     console.log(ress)
// })
// .catch((error) => {
//     console.log(error)
// })