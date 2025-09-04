import client from "../client.js";
import bcrypt from 'bcrypt'
export async function getUserByUsernameOrEmail({usernameOrEmail, password}) {
    const SQL = `
        SELECT * from users
        WHERE username = $1 OR email = $1
    `;
    const {rows} = await client.query(SQL, [usernameOrEmail])
    const user = rows[0]
    if (!user){
        return null
    } 
    const verified = await bcrypt.compare(password, user.password)
    return verified ? user : null
}

export async function getUserById({id}) {
    const SQL = `
        SELECT * from users
        WHERE id = $1
    `;
    const response = await client.query(SQL, [id])
    
    return response.rows[0]
}