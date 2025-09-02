
import client from "./Database/client.js";
import app from "./app.js";
const PORT = process.env.PORT ?? 4443;

await client.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
