import client from "../client.js";
import bcrypt from 'bcrypt'
export async function registerNewUser({firstName, lastName, username, email, password}) {
    const SQL = `
        INSERT INTO users
        (first_name, last_name, username, email, password)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const hashedPass = await bcrypt.hash(password, 10)
    const response = await client.query(SQL, [firstName, lastName, username, email, hashedPass])
    return response.rows[0]
}