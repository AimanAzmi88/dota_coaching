import { pool } from "../../database/connection.js";


export const listSlot = async (req, res) => {
    const query = `
    SELECT slots.id, slots.description, slots.timestamp, slots.book, slots.book_userid, slots.position, users.username, users.id AS user_id 
    FROM slots 
    INNER JOIN users ON slots.user_id = users.id
    WHERE slots.user_id != $1
    AND slots.book = false
    ORDER BY slots.timestamp DESC
    `;

    const userId = req.user;
    try {
        const dbRes = await pool.query(query, [userId]);
        const data = dbRes.rows;
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
export const userSlot = async (req, res) => {
    const query = `
    SELECT slots.id, slots.user_id, slots.description, slots.timestamp, slots.book, slots.position, users.username, users.id AS book_userid
    FROM slots
    LEFT JOIN users ON slots.book_userid = users.id
    WHERE slots.user_id = $1 AND slots.book = false
    ORDER BY slots.timestamp DESC
    `;

    const userId = req.user;

    try {
        const dbRes = await pool.query(query, [userId]);
        res.json(dbRes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



export const userSlotBooked = async (req, res) => {

    const query =`
    SELECT slots.id, slots.user_id, slots.description, slots.timestamp, slots.book, slots.status, slots.position, users.username, users.id AS book_userid
    from users
    INNER JOIN slots ON slots.book_userid = users.id
    WHERE slots.user_id = $1
    ORDER BY slots.timestamp DESC
    `;
    const userId = req.user;

    try {
        const dbRes = await pool.query(query, [userId])
        res.json(dbRes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



export const userBookSlot = async (req, res) => {
    const query = `
        SELECT slots.id, slots.user_id AS slot_user_id, slots.description, slots.timestamp, slots.book, slots.status, slots.position, slots.book_userid, users.username
        FROM users
        INNER JOIN slots ON slots.user_id = users.id
        WHERE slots.book_userid = $1
        ORDER BY slots.timestamp DESC
    `;
    try {
        const id = req.user;
        const dbRes = await pool.query(query, [id]);
        res.json(dbRes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
