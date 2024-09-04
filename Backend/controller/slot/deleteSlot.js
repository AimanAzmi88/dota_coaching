import { pool } from "../../database/connection.js";

const deleteQuery = `
DELETE FROM slots WHERE id = $1
`;

const deleteSlot = async (req, res) => {
    try {
        const id = req.body.id;
        await pool.query(deleteQuery, [id]);
        return res.json({
            message: "Slot deleted successfully"
        })
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error deleting slot."
        });
    };
}

export default deleteSlot;