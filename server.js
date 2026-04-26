const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SQLite Database
const db = new sqlite3.Database('./vitarn_vidya.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initDb();
    }
});

// Initialize database tables
function initDb() {
    db.run(`
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT UNIQUE NOT NULL,
            user_name TEXT,
            units_completed TEXT,
            quiz_scores TEXT,
            questions_answered INTEGER DEFAULT 0,
            time_spent INTEGER DEFAULT 0,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// API Routes

// Get user progress
app.get('/api/progress/:userId', (req, res) => {
    const userId = req.params.userId;
    db.get('SELECT * FROM user_progress WHERE user_id = ?', [userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (row) {
            // Parse JSON fields
            row.units_completed = row.units_completed ? JSON.parse(row.units_completed) : [];
            row.quiz_scores = row.quiz_scores ? JSON.parse(row.quiz_scores) : {};
            res.json(row);
        } else {
            res.json(null);
        }
    });
});

// Save/update user progress
app.post('/api/progress', (req, res) => {
    const { user_id, user_name, units_completed, quiz_scores, questions_answered, time_spent } = req.body;
    
    const unitsCompletedJson = JSON.stringify(units_completed || []);
    const quizScoresJson = JSON.stringify(quiz_scores || {});
    
    db.run(`
        INSERT INTO user_progress (user_id, user_name, units_completed, quiz_scores, questions_answered, time_spent)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
            user_name = excluded.user_name,
            units_completed = excluded.units_completed,
            quiz_scores = excluded.quiz_scores,
            questions_answered = excluded.questions_answered,
            time_spent = excluded.time_spent,
            last_updated = CURRENT_TIMESTAMP
    `, [user_id, user_name, unitsCompletedJson, quizScoresJson, questions_answered, time_spent], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve static files for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Vitarn Vidya server running on port ${PORT}`);
});
