import client from "../client.js";
import bcrypt from 'bcrypt'
//Query for creating a new user
export async function registerNewUser({firstName, lastName, username, email, password}) { //takes in these variables as an object
    const SQL = `
        INSERT INTO users
        (first_name, last_name, username, email, password)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const hashedPass = await bcrypt.hash(password, 10) //takes the password and hashes it 10 times
    const response = await client.query(SQL, [firstName, lastName, username, email, hashedPass]) //saves the variables and the newly hashed password and stores it in the database
    return response.rows[0]
}