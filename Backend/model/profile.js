import { pool } from '../database/connection.js';

const query = `
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    mmr INTEGER,
    bio VARCHAR(255),
    user_id INTEGER REFERENCES users(id),
    username VARCHAR(50),
    ign VARCHAR(50)
)
`;

const profile = async () => {
    try {
        await pool.query(query);
        console.log('Profiles table created successfully.');
    } catch (e) {
        console.error(e);
    }
}

export default profile;