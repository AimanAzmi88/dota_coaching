import { pool } from '../../database/connection.js';

const query = `
INSERT INTO slots (user_id, description, position)
VALUES ($1, $2, $3)
    RETURNING *;
`;

const slot = async (req, res) => {
    try {
        const user_id = req.user;
        const description = req.body.description;
        const position = req.body.position;

        if (!description ||!position) {
            return res.status(400).json({
                 message: 'Please provide both description and position.' 
                });
        }

        const result = await pool.query(query, [user_id, description, position]);
        res.status(201).json({
            message: 'Slot created successfully',
            
    });
    } catch (err) {
        console.error(err);
    }
}

export default slot;