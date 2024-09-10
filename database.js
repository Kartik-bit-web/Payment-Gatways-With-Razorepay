import pg from 'pg';

// Database connection configuration
const client = new pg.Pool({
    host : process.env.HOST,
    database : process.env.DATABASE,
    user : process.env.USER,
    password : process.env.PASSWORD,
    port : process.env.PORT,
});

export {client}