import { client } from "../database.js";

client.connect()
.then(async () => {
    console.log("Database Connected Succesfully");
    const sql = `CREATE TABLE IF NOT EXISTS plans (
        id SERIAL PRIMARY KEY,
        planid VARCHAR(200),
        entity VARCHAR(200),
        interval VARCHAR(200),
        period VARCHAR(200),
        name VARCHAR(200),
        price VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`

    return await client.query(sql);
    
})
.then((res) =>{
    console.log(res)
})
.catch((error) => {
    console.log(error)
})