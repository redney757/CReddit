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
export async function getForumMessages(id) {
    const SQL = `SELECT 
        f.id,
        f.forum_id,
        f.parent_id,
        f.author_id,
        f.body,
        f.created_at,
        u.username AS author_username   
    FROM forum_messages AS f
    LEFT JOIN users AS u
    ON u.id = f.author_id
        WHERE f.forum_id = $1
    `
    const {rows:response} = await client.query(SQL, [id])
    return response
}

export async function createMainMessage(forum_id, author_id, body) {
    const SQL = `
    INSERT into forum_messages
    (forum_id, author_id, body)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `;
    const response = await client.query(SQL, [forum_id, author_id, body])
    return response.rows[0]
}
export async function createRelyMessage(forum_id, parent_id, author_id, body) {
    const SQL = `
    INSERT into forum_messages
    (forum_id, parent_id, author_id, body)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `;
    const response = await client.query(SQL, [forum_id, parent_id, author_id, body])
    return response.rows[0]
}