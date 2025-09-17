import client from "../client.js";
// Queries the database for all repair solutions
export async function getSolutions() {
    const SQL = `
    SELECT * from repair_solutions
    
    `;
    const response =  await client.query(SQL) // uses the client that was created to query the database using the query specified in the variable SQL
    return response.rows
}