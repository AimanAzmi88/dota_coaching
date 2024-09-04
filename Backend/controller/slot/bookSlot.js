import { pool } from "../../database/connection.js";

const query = `
UPDATE slots
SET book = $1, book_userid = $2
WHERE id = $3
RETURNING *
`;

const bookSlot = async (req, res) => {
    try {
        const book_userid = req.user;
        const id = req.body.id;
        const book = true;

        await pool.query(query, [book, book_userid, id]);


        res.status(200).send("Slot booked successfully");

    } catch (e) {
        console.error("Error updating slot:", e);
        res.status(500).send("Internal Server Error");
    }
}

export default bookSlot;
