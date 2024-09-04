import pkg from 'pg';
const { Pool } = pkg;
import createUserTable from '../model/user.js';
import profile from '../model/profile.js';
import slot from '../model/slot.js';

export const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  })

export const databaseInit = async () => {
    try{
        const dbName = await pool.query("SELECT current_database()");
        const name = dbName.rows[0].current_database;
        const dbRes = await pool.query("SELECT NOW()");
        const time = dbRes.rows[0].now

        console.log(`Connected to database: ${name}`);
        console.log(`Current time: ${time}`);

        await createUserTable();
        await profile();
        await slot();
    } catch(e){
        console.error('Error while connecting to database');
    }
};
