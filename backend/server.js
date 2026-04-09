const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

function writeLog(message) {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  const logDir = "/var/log/myapp";

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(`${logDir}/app.log`, log);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql-service",
  user: process.env.DB_USER || "myuser",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "employee_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/", (req, res) => {
  writeLog("Health check endpoint accessed");
  res.send("Backend is running");
});

app.get("/users", (req, res) => {
  writeLog("Users endpoint accessed");

  const sql = "SELECT id, name, email FROM users";

  pool.query(sql, (err, result) => {
    if (err) {
      console.log("SQL Error:", err.message);
      writeLog(`Database error while fetching users: ${err.message}`);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message
      });
    }

    return res.json({
      success: true,
      data: result
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  writeLog(`Login attempt for email: ${email}`);

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  pool.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("SQL Error:", err.message);
      writeLog(`Database error for ${email}: ${err.message}`);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message
      });
    }

    if (result.length > 0) {
      writeLog(`Login success for email: ${email}`);
      return res.json({
        success: true,
        message: "Login successful"
      });
    }

    writeLog(`Login failed for email: ${email}`);
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});


// test backend cicd
