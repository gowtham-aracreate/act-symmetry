const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  // Middleware to parse JSON
app.use(express.static(path.join(__dirname, '../frontend/build')));

mongoose.connect('mongodb://localhost:27017/adminuser')
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    pass: String
});

const Users = mongoose.model("data", userSchema);

app.post('/register', async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        if (!email || !pass || !name) {
            return res.status(400).json({ error: "Name, Email, and password are required" });
        }

        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new Users({ name, email, pass });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
