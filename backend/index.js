const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/User');
    console.log('Database connected');
};
connectDB();

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
    const { email, password } = req.body;
    const data = await User.create({ email, password });
    res.send(data);
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});