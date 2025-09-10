import client from "../client.js";

export async function getForaByCreator(id) {
    const SQL = `
        SELECT
            f.id,
            f.subject,
            f.body,
            f.created_at,
            f.created_by,
            u.id AS author_id
        FROM forums AS f
        LEFT JOIN users AS u
        ON u.id = f.created_by
        WHERE u.id = $1
        ORDER BY f.created_at DESC;
        
    `;
    const {rows : forums } = await client.query(SQL, [id])
    return forums
}