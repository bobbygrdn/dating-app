require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// const controller = require("./src/backend/controller");

const path = require("path");
const pool = require("./src/backend/connection");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("build"));

app.use(cors());

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Listening on port: ${PORT}`);
});

//GET ALL users;
app.get("/api/users", async (req, res) => {
  try {
    let client = await pool.connect();
    let data = await client.query("SELECT * FROM users");
    res.json(data.rows);
    client.release();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//GET ONE user;
app.get("/api/users/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query("SELECT * FROM users WHERE user_id=$1;", [
      req.params.id
    ]);
    res.json(data.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//POST a user;
app.post("/api/users", async (req, res) => {
  try {
    const data = await pool.query(
      "INSERT INTO users(username, first_name, last_name, email, password, age, height, body_type, gender, profile_pic_url, sexual_orientation, city, state, zipcode, bio) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
      [
        req.body.username,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password,
        req.body.age,
        req.body.height,
        req.body.body_type,
        req.body.gender,
        req.body.profile_pic_url,
        req.body.sexual_orientation,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.bio,
      ]
    );
    res.send(req.body);
  } catch (err) {
    console.error(err);
  }
});

//UPDATE a user;
app.patch("/api/users/:id", async (req, res) => {
  try {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      age,
      height,
      body_type,
      gender,
      profile_pic_url,
      sexual_orientation,
      city,
      state,
      zipcode,
      bio,
    } = req.body;
    console.log(req.params);
    const data = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      parseInt(req.params.id),
    ]);
    const updateDB = {
      username: username || data.rows[0].username,
      first_name: first_name || data.rows[0].first_name,
      last_name: last_name || data.rows[0].last_name,
      email: email || data.rows[0].email,
      password: password || data.rows[0].password,
      age: parseInt(age) || data.rows[0].age,
      height: parseInt(height) || data.rows[0].height,
      body_type: body_type || data.rows[0].body_type,
      gender: gender || data.rows[0].gender,
      profile_pic_url: profile_pic_url || data.rows[0].profile_pic_url,
      sexual_orientation: sexual_orientation || data.rows[0].sexual_orientation,
      city: city || data.rows[0].city,
      state: state || data.rows[0].state,
      zipcode: parseInt(zipcode) || data.rows[0].zipcode,
      bio: bio || data.rows[0].bio,
    };
    const updateUsers = await pool.query(
      `UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4, password = $5, age = $6, height = $7, body_type = $8, gender = $9, profile_pic_url = $10, sexual_orientation = $11, city = $12, state = $13, zipcode = $14, bio = $15 WHERE user_id = $16 RETURNING *`,
      [
        updateDB.username,
        updateDB.first_name,
        updateDB.last_name,
        updateDB.email,
        updateDB.password,
        updateDB.age,
        updateDB.height,
        updateDB.body_type,
        updateDB.gender,
        updateDB.profile_pic_url,
        updateDB.sexual_orientation,
        updateDB.city,
        updateDB.state,
        updateDB.zipcode,
        updateDB.bio,
        req.params.id,
      ]
    );
    res.json(updateUsers.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//DELETE a user;
app.delete("/api/users/:id", async (req, res) => {
  try {
    await pool.connect();
    const data = await pool.query("DELETE FROM users WHERE user_id = $1;", [
      req.params.id,
    ]);
    res.json(data.rows);
  } catch (err) { }
});

//GET ALL pending_connections;
app.get("/api/pending_connections", async (req, res) => {
  try {
    pool.connect();
    const data = await pool.query("SELECT * FROM pending_connections;");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
  }
});

//GET ONE pending_connection;
app.get("/api/pending_connections/:id", async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM pending_connections WHERE pending_connections_id=$1;",
      [parseInt(req.params.id)]
    );
    res.json(data.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//DELETE a pending_connection;
app.delete("/api/pending_connections/:id", async (req, res) => {
  try {
    await pool.connect();
    const data = await pool.query(
      "DELETE FROM pending_connections WHERE pending_connections_id = $1;",
      [req.params.id]
    );
    res.json(data.rows);
  } catch (err) { }
});

//GET ALL messages;
app.get("/api/messages", async (req, res) => {

  try {
    let client = await pool.connect()
    const data = await client.query("SELECT * FROM messages;");
    res.json(data.rows);
    client.release()
  } catch (err) {
    console.error(err);
    res.send(err)
  }
});

//GET ONE message;
app.get("/api/messages/:id", async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM messages WHERE message_id=$1;",
      [parseInt(req.params.id)]
    );
    res.json(data.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//GET all messages by thread ID;
app.get("/api/thread/messages/:id", async (req, res) => {
  try {
    const client = await pool.connect()
    const data = await pool.query("SELECT * FROM messages WHERE thread_id=$1;", [req.params.id]);
    res.json(data.rows);
    client.release()
  } catch (err) {
    console.error(err);
    res.send(err)
  }
});

//POST a message;
app.post("/api/messages", async (req, res) => {
  try {
    const data = await pool.query(
      "INSERT INTO messages(date_stamp, time_stamp, read_receipt, sent_from_user_id, sent_to_user_id, content) VALUES($1, $2, $3, $4, $5, $6)",
      [
        req.body.date_stamp,
        req.body.time_stamp,
        req.body.read_receipt,
        req.body.sent_from_user_id,
        req.body.sent_to_user_id,
        req.body.content,
      ]
    );
    res.send(req.body);
  } catch (err) {
    console.error(err);
  }
});

//UPDATE a message;
app.patch("/api/messages/:id", async (req, res) => {
  try {
    const {
      date_stamp,
      time_stamp,
      read_receipt,
      sent_from_user_id,
      sent_to_user_id,
      content,
    } = req.body;
    console.log(req.params);
    const data = await pool.query(
      `SELECT * FROM messages WHERE message_id = $1`,
      [parseInt(req.params.id)]
    );
    const updateDB = {
      date_stamp: parseInt(date_stamp) || data.rows[0].date_stamp,
      time_stamp: parseInt(time_stamp) || data.rows[0].time_stamp,
      read_receipt: read_receipt || data.rows[0].read_receipt,
      sent_from_user_id: sent_from_user_id || data.rows[0].sent_from_user_id,
      sent_to_user_id: sent_to_user_id || data.rows[0].sent_to_user_id,
      content: content || data.rows[0].content,
    };
    const updateMessages = await pool.query(
      `UPDATE messages SET date_stamp = $1, time_stamp = $2, read_receipt = $3, sent_from_user_id = $4, sent_to_user_id = $5, content = $6 WHERE message_id = $7 RETURNING *`,
      [
        updateDB.date_stamp,
        updateDB.time_stamp,
        updateDB.read_receipt,
        updateDB.sent_from_user_id,
        updateDB.sent_to_user_id,
        updateDB.content,
        req.params.id,
      ]
    );
    res.json(updateMessages.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

//DELETE a message;
app.delete("/api/messages/:id", async (req, res) => {
  try {
    await pool.connect();
    const data = await pool.query(
      "DELETE FROM messages WHERE message_id = $1;",
      [req.params.id]
    );
    res.json(data.rows);
  } catch (err) { }
});

//GET ALL threads
app.get("/api/threads", async (req, res) => {
  try {
    pool.connect();
    const data = await pool.query("SELECT * FROM threads;");
    res.json(data.rows);
  } catch (err) {
    console.error(err);
  }
});

//GET ONE thread by thread_id
app.get("/api/threads/:id", async (req, res) => {
  try {
    let client = await pool.connect()
    const data = await client.query(
      "SELECT * FROM threads WHERE thread_id=$1;",
      [parseInt(req.params.id)]
    );
    res.json(data.rows[0]);
    client.release()
  } catch (err) {
    console.error(err);
  }
});

//Get threads by user- recipient id or sender id
app.get('/api/threads/user/:id', async (req, res) => {
  try {
    let client = await pool.connect();
    let data = await client.query('SELECT * FROM threads WHERE recipient_user_id = $1 OR sender_user_id = $1', [req.params.id])
    res.json(data.rows)
    client.release()
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

//DELETE thread by thread_id
app.delete("/api/threads/:id", async (req, res) => {
  try {
    await pool.connect();
    const data = await pool.query(
      "DELETE FROM threads WHERE thread_id = $1 AND sender_user_id = $2;",
      [req.params.id]
    );
    res.json(data.rows);
  } catch (err) { }
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.use((_, res) => {
  res.status(404);
  res.setHeader("Content-type", "text/plain");
  res.send("Not Found");
});
