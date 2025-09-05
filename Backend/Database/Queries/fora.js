import client from "../client.js";
import bcrypt from 'bcrypt'
export async function getFora() {
    const SQL = `
        SELECT
            f.id,
            f.subject,
            f.body,
            f.created_at,
            f.created_by,
            u.username AS author_username
        FROM forums AS f
        LEFT JOIN users AS u
        ON u.id = f.created_by
        ORDER BY f.created_at DESC;
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
    const SQL = `SELECT
            f.id,
            f.subject,
            f.body,
            f.created_at,
            f.created_by,
            u.username AS author_username
        FROM forums AS f
        LEFT JOIN users AS u
        ON u.id = f.created_by
        WHERE f.id = $1
    `
    const response = await client.query(SQL, [id])
    return response.rows[0]
}