import express from "express";
import redis from "redis";

const app = express();
app.use(express.json());
const client = redis.createClient(6379);

app.post("/", (req, res) => {
  const data = req.body;

  client.get(JSON.stringify(data), (_, reply) => {
    // see if the data was cached within the last 10 minutes
    if (reply !== null) return res.status(403).end();

    // set data to expire in 10 minutes
    client.setex(
      JSON.stringify(data),
      process.env.NODE_ENV === "test" ? 2 : 600,
      true,
      () => {
        return res.status(200).end();
      }
    );
  });
});

export { app, client };
