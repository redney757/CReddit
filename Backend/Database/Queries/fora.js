import client from "../client.js";

// Query to get the all of the forums / joins the users table with the forums table and associates the users ID from the users table with the created_by column in the forums table and orders them by the time they were created.
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
//Query to create a forum
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
//query to get the forum by the ID that was requested
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

//Query to get the forum messages by the ID of the forum that was requested
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
        ORDER BY f.created_at ASC;
    `
    const {rows:response} = await client.query(SQL, [id])
    return response
}
//Query to create a forum message(contains no parent ID)
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
//Query to create a reply message (contains parent ID)
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