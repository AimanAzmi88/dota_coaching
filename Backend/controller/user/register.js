import { pool } from "../../database/connection.js";
import bcrypt from "bcrypt"

const insertNewUser = `
INSERT INTO  users (username, password, email)
VALUES ($1, $2, $3)
RETURNING *;
`;

const checkEmail = `
SELECT * FROM users
WHERE email = $1
`;

const checkUsername = `
SELECT * FROM users
WHERE username = $1
`;

const profile = `
INSERT INTO profiles (username, user_id)
VALUES ($1, $2)
`;

 const createUser = async (req,res) => {
    try {
        const SALTROUNDS = 10;

         const username = '@' + req.body.username
         const password =  req.body.password
         const email = req.body.email


         if(!username ||!password ||!email){
             return res.status(400).json({
                 message : "username, password, and email is required"
             })
         }

         const emailRegex = /\S+@\S+\.\S+/;
         if(!emailRegex.test(email)){
             return res.status(400).json({
                 message : "Invalid email format"
             })
         }

         const dbResEmail = await pool.query(checkEmail, [email]);
         if(dbResEmail.rows.length > 0){
            return res.status(400).json({
                message : "Email already exists"
 
            })
         }
         const dbResUsername = await pool.query(checkUsername, [username]);
         if(dbResUsername.rows.length > 0){
             return res.status(400).json({
                 message : "Username already exists"
             })
         }

         const salt = await bcrypt.genSalt(SALTROUNDS);
         const hashedPassword = await bcrypt.hash(password, salt);


        const dbRes = await pool.query(insertNewUser, [username, hashedPassword, email]);
        const data = dbRes.rows[0]
        const userId = data.id


        await pool.query(profile, [username, userId])
        res.status(201).json({
            message : "User created successfully",
            data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

export default createUser;