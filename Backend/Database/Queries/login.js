import client from "../client.js";
import bcrypt from 'bcrypt'
// query to get the user by their email or username
export async function getUserByUsernameOrEmail({usernameOrEmail, password}) {
    const SQL = `
        SELECT * from users
        WHERE username = $1 OR email = $1
    `;
    const {rows} = await client.query(SQL, [usernameOrEmail])
    const user = rows[0]
    if (!user){ // if no user is found the function returns null
        return null
    } 
    const verified = await bcrypt.compare(password, user.password) //compares the given password to the hashed password and authorizes the user 
    return verified ? user : null
}
//Query to get the user by their associated ID
export async function getUserById({id}) {
    const SQL = `
        SELECT * from users
        WHERE id = $1
    `;
    const response = await client.query(SQL, [id])
    
    return response.rows[0]
}