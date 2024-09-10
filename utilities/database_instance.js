import { client } from "../database.js";

class quaryData{
    constructor(sql){
        this.sql = sql;
        // this.id = id;
    }

    async findById(){

        try {
            await client.connect()
            const result = await client.query(this.sql);
            return result.rows;
        } catch (error) {
            return error;
        }
        
            
        
    }
}



export {quaryData}