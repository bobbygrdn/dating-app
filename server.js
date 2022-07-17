require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

// const controller = require("./src/backend/controller");

const path = require("path");
const pool = require("./src/backend/connection");
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
});

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("build"));

app.use(cors());

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Listening on port: ${PORT}`);
});

//GET ALL users except for the user logged in;
app.get("/api/current/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let client = await pool.connect();
    let data = await client.query(
      `SELECT * FROM users WHERE user_id != '${id}' LIMIT 500;`
    );
    res.json(data.rows);
    client.release();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
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

//GET ONE user;`
app.get("/api/users/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query("SELECT * FROM users WHERE user_id=$1;", [
      req.params.id,
    ]);
    res.json(data.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

// update the liked on a user
app.patch("/api/liked/:id", async(req,res) => {
  try {
    let { userInfo } = req.body
    const client = await pool.connect();
    const data = await client.query(`UPDATE users SET liked =CONCAT('${userInfo},',liked) WHERE user_id = '${req.params.id}';`)
    res.json(data.rows[0]);
    client.release();
  } catch (error) {
    console.error(error)
  }
})

//Post User Data with Email && Password
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    let client = await pool.connect();
    const { rows } = await client.query(
      "SELECT * FROM users WHERE username =$1 AND password =$2;",
      [username, password]
    );
    if (rows.length === 0) {
      res.send(
        "Invalid username and password, please create an account or try again."
      );
    } else {
      res.json(rows);
      client.release();
    }
  } catch (error) {
    console.log(error);
  }
});

//POST a user;
app.post("/api/users", async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query(
      "INSERT INTO users(username, first_name, last_name, email, password, age, height, body_type, gender, profile_pic_url, sexual_orientation, city, state, zipcode, bio, font_style, font_size, dark_theme, gender_preference, age1, age2) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)",
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
        req.body.font_style,
        req.body.font_size,
        req.body.dark_theme,
        req.body.gender_preference,
        req.body.age1,
        req.body.age2,
      ]
    );
    res.send(req.body);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//UPDATE a user;
app.patch("/api/users/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      profile_pic_url,
      age,
      height,
      body_type,
      gender,
      bio,
      sexual_orientation,
      city,
      state,
      zipcode,
      age1,
      age2,
      gender_preference,
      dark_theme,
      font_size,
      font_style,
      liked,
    } = req.body;
    console.log(req.params);
    const data = await client.query(`SELECT * FROM users WHERE user_id = $1`, [
      parseInt(req.params.id),
    ]);
    const updateDB = {
      username: username || data.rows[0].username,
      first_name: first_name || data.rows[0].first_name,
      last_name: last_name || data.rows[0].last_name,
      email: email || data.rows[0].email,
      password: password || data.rows[0].password,
      profile_pic_url: profile_pic_url || data.rows[0].profile_pic_url,
      age: parseInt(age) || data.rows[0].age,
      height: parseInt(height) || data.rows[0].height,
      body_type: body_type || data.rows[0].body_type,
      gender: gender || data.rows[0].gender,
      bio: bio || data.rows[0].bio,
      sexual_orientation: sexual_orientation || data.rows[0].sexual_orientation,
      city: city || data.rows[0].city,
      state: state || data.rows[0].state,
      zipcode: parseInt(zipcode) || data.rows[0].zipcode,
      age1: parseInt(age1) || data.rows[0].age1,
      age2: parseInt(age2) || data.rows[0].age2,
      gender_preference: gender_preference || data.rows[0].gender_preference,
      dark_theme: dark_theme || data.rows[0].dark_theme,
      font_size: font_size || data.rows[0].font_size,
      font_style: font_style || data.rows[0].font_style,
      liked: liked || data.rows[0].liked,
    };
    const updateUsers = await client.query(
      `UPDATE users SET username = $1, first_name = $2, last_name = $3, email = $4, password = $5, profile_pic_url =$ 6, age = $7, height = $8, body_type = $9, gender = $10, bio = $11, sexual_orientation = $12, city = $13, state = $14, zipcode = $15, age1 = $16, age2 = $17, gender_preference = $18, dark_theme = $19, font_size = $20, font_style = $21, liked = $22 WHERE user_id = $23 RETURNING *`,
      [
        updateDB.username,
        updateDB.first_name,
        updateDB.last_name,
        updateDB.email,
        updateDB.password,
        updateDB.profile_pic_url,
        updateDB.age,
        updateDB.height,
        updateDB.body_type,
        updateDB.gender,
        updateDB.bio,
        updateDB.sexual_orientation,
        updateDB.city,
        updateDB.state,
        updateDB.zipcode,
        updateDB.age1,
        updateDB.age2,
        updateDB.gender_preference,
        updateDB.dark_theme,
        updateDB.font_size,
        updateDB.font_style,
        updateDB.liked,
        req.params.id,
      ]
    );
    res.json(updateUsers.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//!----------- PROFILE UPDATE ROUTES
//gets profile pic from user
app.get('/api/profilepic/:id', async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query('SELECT profile_pic_url FROM users WHERE user_id=$1',[req.params.id])
    res.json(data.rows[0])
    client.release()
  } 
  catch (error) {
    console.log(error)
    res.send(error)
  }
})
//update user 'at a glance' data
app.patch('/api/userdata/glance/:id' ,async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('UPDATE users SET first_name = $1, last_name = $2, age = $3, city = $4, state = $5, zipcode = $6 WHERE user_id = $7', [req.body.first_name, req.body.last_name, req.body.age, req.body.city, req.body.state, req.body.zipcode, req.params.id ] )
    res.json(req.body)
    client.release()
    
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
//update user 'Connections match info' data
app.patch('/api/userdata/connection-match/:id' ,async (req, res) => {

  try {
    const client = await pool.connect();
    await client.query('UPDATE users SET height = $1, body_type = $2, gender = $3, sexual_orientation = $4  WHERE user_id = $5', [req.body.height, req.body.body_type, req.body.gender, req.body.sexual_orientation, req.params.id ] )
    res.json(req.body)
    client.release()
    
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
//update user bio data
app.patch('/api/userdata/bio/:id' ,async (req, res) => {

  try {
    const client = await pool.connect();
    await client.query('UPDATE users SET bio = $1 WHERE user_id = $2', [req.body.bio, req.params.id ] )
    res.json(req.body)
    client.release()
    
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
//update login settings info
app.patch('/api/userdata/login/:id' ,async (req, res) => {

  try {
    const client = await pool.connect();
    await client.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE user_id = $4', [req.body.username, req.body.email, req.body.password, req.params.id ] )
    res.json(req.body)
    client.release()
    
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
//updates user dark theme setting
app.patch('/api/userdata/darktheme/:id', async (req, res) => {
  try {
    let client = await pool.connect()
    await client.query('UPDATE users SET dark_theme = $1 WHERE user_id = $2', [req.body.dark_theme, req.params.id])
    res.json(req.body)
    client.release()
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
//updates user font size setting
app.patch('/api/userdata/fontsize/:id', async (req, res) => {
  try {
    let client = await pool.connect()
    await client.query('UPDATE users SET font_size = $1 WHERE user_id = $2', [req.body.font_size, req.params.id])
    res.json(req.body)
    client.release()
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

//update user font style preference
app.patch('/api/userdata/fontstyle/:id', async (req, res) => {
  try {
    let client = await pool.connect()
    await client.query('UPDATE users SET font_style = $1 WHERE user_id = $2', [req.body.font_style, req.params.id])
    res.json(req.body)
    client.release()
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})
//!-----------------------------

//DELETE a user;
app.delete("/api/users/:id", async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query("DELETE FROM users WHERE user_id = $1;", [
      req.params.id,
    ]);
    res.json(data.rows);
    client.release();
  } catch (err) {
    console.error(err);
  }
});


//GET ALL pending_connections;
app.get("/api/pending_connections", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query("SELECT * FROM pending_connections;");
    res.json(data.rows);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//GET ONE pending_connection;
app.get("/api/pending_connections/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query(
      "SELECT * FROM pending_connections WHERE pending_connections_id=$1;",
      [parseInt(req.params.id)]
    );
    res.json(data.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//DELETE a pending_connection;
app.delete("/api/pending_connections/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query(
      "DELETE FROM pending_connections WHERE pending_connections_id = $1;",
      [req.params.id]
    );
    res.json(data.rows);
    client.release();
  } catch (err) {}
});

//GET ALL messages;
app.get("/api/messages", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query("SELECT * FROM messages;");
    res.json(data.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

//GET ONE message;
app.get("/api/messages/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query(
      "SELECT * FROM messages WHERE message_id=$1;",
      [parseInt(req.params.id)]
    );
    res.json(data.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//GET all messages by thread ID;
app.get("/api/thread/messages/:id", async (req, res) => {
  try {
    const client = await pool.connect();
    const data = await client.query(
      "SELECT * FROM messages WHERE thread_id=$1;",
      [req.params.id]
    );
    res.json(data.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

//POST a message;
app.post("/api/messages", async (req, res) => {
  try {
    let client = await pool.connect();
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
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//UPDATE a message;
app.patch("/api/messages/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const {
      date_stamp,
      time_stamp,
      read_receipt,
      sent_from_user_id,
      sent_to_user_id,
      content,
    } = req.body;
    console.log(req.params);
    const data = await client.query(
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
    const updateMessages = await client.query(
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
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//DELETE a message;
app.delete("/api/messages/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query(
      "DELETE FROM messages WHERE message_id = $1;",
      [req.params.id]
    );
    res.json(data.rows);
    client.release();
  } catch (err) {}
});

//GET ALL threads
app.get("/api/threads", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query("SELECT * FROM threads;");
    res.json(data.rows);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//GET ONE thread by thread_id
app.get("/api/threads/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query(
      "SELECT * FROM threads WHERE thread_id=$1;",
      [parseInt(req.params.id)]
    );
    res.json(data.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
  }
});

//Get threads by user- recipient id or sender id
app.get("/api/threads/user/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    let data = await client.query(
      "SELECT * FROM threads WHERE recipient_user_id = $1 OR sender_user_id = $1",
      [req.params.id]
    );
    res.json(data.rows);
    client.release();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//DELETE thread by thread_id
app.delete("/api/threads/:id", async (req, res) => {
  try {
    let client = await pool.connect();
    const data = await client.query(
      "DELETE FROM threads WHERE thread_id = $1 AND sender_user_id = $2;",
      [req.params.id]
    );
    res.json(data.rows);
    client.release();
  } catch (err) {}
});

app.post("/image/:id", imageUpload.single("image"), async (req, res) => {
  try {
    let client = await pool.connect();
    await client.query(
      "UPDATE users SET profile_pic_url = $1 WHERE user_id = $2",
      [req.file.path, req.params.id]
    );
    res.json("/image upload done");
    client.release();
  } catch (err) {
    console.error(err.message);
  }
  console.log(req.file.filename);
});

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, "images/" + filename);
  console.log(fullfilepath);
  return res.sendFile(fullfilepath);
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.use((_, res) => {
  res.status(404);
  res.setHeader("Content-type", "text/plain");
  res.send("Not Found");
});
