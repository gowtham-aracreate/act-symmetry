const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Users')
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const Users = mongoose.model("users", userSchema);

const createdUserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    locality: String,
    statecode: String,
    pin: String,
    status: String
});

const CreatedUsers = mongoose.model("createdUsers", createdUserSchema);

const deviceSchema = new mongoose.Schema({
    dname: String,
    dnum: String, // Removed unique constraint
    macid: String
});

const Devices = mongoose.model("devices", deviceSchema);

app.post('/create', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await Users.create({
            name,
            email,
            password: hashedPassword
        });
        res.json(data);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).send('Error creating user');
    }
});

app.post('/createExtended', async (req, res) => {
    const { name, email, password, address, locality, statecode, pin, status } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await CreatedUsers.create({
            name,
            email,
            password: hashedPassword,
            address,
            locality,
            statecode,
            pin,
            status
        });
        res.json(data);
    } catch (error) {
        console.error('Error creating extended user', error);
        res.status(500).send('Error creating extended user');
    }
});

app.get('/newdevice', async (req, res) => {
    try {
        const devices = await Devices.find();
        res.json(devices);
    } catch (error) {
        console.error('Error fetching devices', error);
        res.status(500).send('Error fetching devices');
    }
});

// ✅ FIXED DEVICE CREATION
app.post('/newdevice', async (req, res) => {
    const { dname, dnum, macid } = req.body;

    // Input validation
    if (!dname || !dnum || !macid) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newDevice = new Devices({ dname, dnum, macid });
        await newDevice.save();
        res.status(201).json(newDevice);
    } catch (error) {
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return res.status(400).json({ error: 'Device with this dnum already exists' });
        }
        console.error('Error saving device:', {
            message: error.message,
            stack: error.stack,
            data: req.body,
        });
        res.status(500).json({ error: 'Error saving device' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(401).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).send('Invalid email or password');
        }

        res.send({ message: 'Login successful', redirectUrl: '/dashboard' });
    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).send('Error logging in user');
    }
});

app.get('/users', async (req, res) => {
    const data = await Users.find();
    res.json(data);
});

app.get('/createdUsers', async (req, res) => {
    try {
        const data = await CreatedUsers.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching extended users', error);
        res.status(500).send('Error fetching extended users');
    }
});

app.get('/devices', async (req, res) => {
    try {
        const data = await Devices.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching devices', error);
        res.status(500).send('Error fetching devices');
    }
});

app.put('/updateUser/:email', async (req, res) => {
    const { email } = req.params;
    const { name, address, locality, statecode, pin, status } = req.body;
    try {
        const updatedUser = await CreatedUsers.findOneAndUpdate(
            { email },
            { name, address, locality, statecode, pin, status },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user', error);
        res.status(500).send('Error updating user');
    }
});

app.delete('/deleteUser/:email', async (req, res) => {
    const { email } = req.params;
    try {
        await CreatedUsers.findOneAndDelete({ email });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).send('Error deleting user');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
