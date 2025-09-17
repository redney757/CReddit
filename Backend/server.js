
import client from "./Database/client.js";
import app from "./app.js";
import fs from 'fs'
import https from 'https'
//specify variables -- this uses variables specified in the .env file (located in top level, also specified to be ignored by github)
const PORT = process.env.PORT ?? 4443;
const PORTS = process.env.PORTS
const HOST = process.env.HOST
// initial connection to the client.
await client.connect();

//specify a certificate file and the password to that certificate file (also .env)
const creds = {
  pfx: fs.readFileSync('C:\\Users\redney\Desktop\origin.pfx'),
  passphrase: process.env.PFX_PASSWORD
}
//Creates an HTTPS server using the credentials and specifies app as the middleware from app.js to handle incoming requests
https.createServer(creds, app).listen(PORTS, HOST, () => {
  console.log('STARTED HTTPS on port' + PORTS)
})
//creates an HTTP server that listens on a separate port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
