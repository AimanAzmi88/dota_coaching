import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../../database/connection.js';

const loginUser = `
SELECT * FROM users
WHERE username = $1
`;

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ 
                message: 'Please provide username and password.' 
            });
        }

        const dbRes = await pool.query(loginUser, [username]);
        const user = dbRes.rows[0];

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        } 
        
        const data = {
            id: user.id,
            username: user.username
        };

        const token = jwt.sign(data, 'secret', { expiresIn: '1h' });
        console.log('Generated Token:', token); // Log the token for debugging
        res.status(200).json({
            message: 'Logged in successfully',
            token
        });

    } catch (e) {
        console.error('Error during login:', e); // More detailed logging
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

export default login;
