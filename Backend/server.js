
import client from "./Database/client.js";
import app from "./app.js";
import fs from 'fs'
import http from 'http'
import https from 'https'

const PORT = process.env.PORT ?? 4443;
const PORTS = process.env.PORTS
const HOST = process.env.HOST
await client.connect();

const creds = {
  pfx: fs.readFileSync('C:\\Users\redney\Desktop\origin.pfx'),
  passphrase: process.env.PFX_PASSWORD
}
https.createServer(creds, app).listen(PORTS, HOST, () => {
  console.log('STARTED HTTPS on port' + PORTS)
})
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
