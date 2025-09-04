import client from "../client.js";
import bcrypt from 'bcrypt'
export async function getFora() {
    const SQL = `
        SELECT * from forums
    `;
    const {rows : forums } = await client.query(SQL)
    return forums
}
export async function createForum({subject, body, id}) {
    const SQL = `
    INSERT INTO forums
    (subject, body, created_by)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;
    const {rows} = await client.query(SQL, [subject, body, id])
    return rows[0]

}
export async function getForum(id) {
    const SQL = `SELECT * from forums
    WHERE id = $1
    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}