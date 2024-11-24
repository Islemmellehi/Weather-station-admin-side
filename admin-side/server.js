const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to PostgreSQL database.");
  }
});

// Function to create a new user
async function createUser(username, hashedPassword) {
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, password",
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Error creating user");
  }
}

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT username, password FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await createUser(username, hashedPassword); // Create user
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const result = await pool.query("DELETE FROM users WHERE username = $1", [username]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
