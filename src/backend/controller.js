const pool = require('./connection.js');

const testRoute = (_, res) => {
    res.send('working')
}

const getAllUsers = async (_, res) => {
    try {
        let client = await pool.connect();
        let data = await client.query('SELECT * FROM users');
        res.json(data.rows)
        client.release();
    }
    catch (error) {
        console.log(error);
        res.send(error)
    }
}

const getOneUserById = async (req, res) => {
    let userId = req.params.id

    try {
        let client = await pool.connect();
        let data = await client.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        res.json(data.rows);
        client.release()
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = {
    testRoute,
    getAllUsers,
    getOneUserById
}