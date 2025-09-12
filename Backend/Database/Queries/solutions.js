import client from "../client.js";

export async function getSolutions() {
    const SQL = `
    SELECT * from repair_solutions
    
    `;
    const response =  await client.query(SQL)
    return response.rows
}