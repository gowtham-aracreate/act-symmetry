const express = require('express'); 
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  // Middleware to parse JSON
app.use(express.static(path.join(__dirname, '../frontend/build')));

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.error("MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
    email: String,
    pass: String
});

const Users = mongoose.model("data", userSchema);

app.post('/post', async (req, res) => {
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = new Users({ email, pass });
        await user.save();
        
        console.log(user);
        res.status(201).json({ message: "Form submitted successfully" });
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
