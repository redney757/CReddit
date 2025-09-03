import client from "../client.js";
import bcrypt from 'bcrypt'
export async function getFora() {
    const SQL = `
        SELECT * from forums
    `;
    const {rows : forums } = await client.query(SQL)
    return forums
}