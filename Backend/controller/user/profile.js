import { pool } from "../../database/connection.js";

const query = `
SELECT * FROM profiles
WHERE user_id = $1
`;

const updateQuery = `
UPDATE profiles SET mmr = $2, bio = $3, ign = $4
    WHERE user_id = $1
    RETURNING *
`;

export const getProfile = async (req, res) => {
    try {
        const dbRes = await pool.query(query, [req.user])
        const profile = dbRes.rows[0];
        res.status(200).json(profile);
    } catch (e) {
        console.error(e);
        res.status(500).send({
             message: 'Error retrieving profile.' 
            });
    }
}

export const updateProfile = async (req, res) => {
    try  {
        const mmr = req.body.mmr
        const bio = req.body.bio
        const ign = req.body.ign
        const userId = req.user

        if (!mmr ||!bio ||!ign) {
            return res.status(400).send({
                message: 'MMR, Bio, and IGN are required.'
            });
        }
        
        const dbRes = await pool.query(updateQuery, [userId, mmr, bio, ign])
        if (dbRes.rows.length > 0) {
            res.status(200).send({
                message: 'Profile updated successfully.'
            });
        }


    } catch (e) {
        console.error(e);
        res.status(500).send({ 
            message: 'Error updating profile.' 
        });
    }
}
