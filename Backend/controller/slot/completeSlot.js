import { pool } from "../../database/connection.js";

const query = `
UPDATE slots
SET status = $1
WHERE id = $2
RETURNING *
`;

const completeSlot = async (req, res) => {
    try {
        const status = true;
        const id = req.body.id

        await pool.query(query, [status, id]);


        res.status(200).send("Slot booked successfully");

    } catch (e) {
        console.error("Error updating slot:", e);
        res.status(500).send("Internal Server Error");
    }
}

export default completeSlot;
