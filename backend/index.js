require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

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

const newDeviceSchema = new mongoose.Schema({
    dname:  { type: String, required: true },
    dnum: { type: Number, required: true },
    macid: { type: String, required: true }
});

const NewDeviceUsers = mongoose.model("newdevice", newDeviceSchema);

const deviceMappingSchema = new mongoose.Schema({
    name: String,
    mname:  { type: String, required: true },
    mnum: { type: Number, required: true },
    status: { type: String, required: true }
});

const DeviceMapping = mongoose.model("deviceMapping", deviceMappingSchema);

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});

const OTP = mongoose.model("otp", otpSchema);

const transporter = nodemailer.createTransport({
 service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail ID
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
});

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

app.put('/updateExtendedUser/:id', async (req, res) => {
    const { id } = req.params; // Extract the user ID from the URL
    const { name, email, password, address, locality, statecode, pin, status } = req.body;

    try {
        // If a new password is provided, hash it
        let updatedFields = { name, email, address, locality, statecode, pin, status };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        // Find and update the user by ID
        const updatedUser = await CreatedUsers.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true, runValidators: true } // Return the updated document and validate input
        );

        // If the user is not found, return a 404 error
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        // Respond with the updated user
        res.json({ message: "User updated successfully!", user: updatedUser });
    } catch (error) {
        console.error('Error updating extended user:', error);
        res.status(500).send('Error updating extended user');
    }
});

app.post('/newdevice', async(req, res) => {
    try {
        const { dname, dnum, macid } = req.body;
        const newDevice = new NewDeviceUsers({ dname, dnum, macid });
        await newDevice.save();
        res.status(201).json({ message: "Device added successfully!", device: newDevice });
      } catch (error) {
        res.status(500).json({ error: "Error saving device" });
      }
});

app.get('/newdevice', async (req, res) => {
    try {
        const devices = await NewDeviceUsers.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: "Error fetching devices" });
    }
});

app.post('/deviceMapping', async(req, res) => {
    try {
        const { mname, mnum,status } = req.body;
        const newMapping = new DeviceMapping({ mname, mnum,status });
        await newMapping.save();
        res.status(201).json({ message: "Device mapping added successfully!", mapping: newMapping });
      } catch (error) {
        res.status(500).json({ error: "Error saving device mapping" });
      }
});

app.get('/deviceMapping', async (req, res) => {
    try {
        const mappings = await DeviceMapping.find();
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching device mappings" });
    }
});

app.put('/updateDevice/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { dname, dnum, macid } = req.body;
  
      // Validate input
      if (!dname || !dnum || !macid) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Update the device in the database
      const updatedDevice = await DeviceModel.findByIdAndUpdate(
        id,
        { dname, dnum, macid },
        { new: true }
      );
  
      if (!updatedDevice) {
        return res.status(404).json({ message: 'Device not found' });
      }
  
      res.status(200).json({ device: updatedDevice });
    } catch (error) {
      console.error('Error updating device:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email });
  
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "OTP sent to email" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
});

app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });
  
    if (!otpRecord) return res(400).json({ message: "Invalid OTP" });
    if (otpRecord.expiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }
    
    res.json({ message: "OTP verified successfully" });
});

app.post("/reset-password", async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });
  
    if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

    // Hash the new password before storing it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.updateOne({ email }, { password: hashedPassword });

    await OTP.deleteOne({ email });

    res.json({ message: "Password reset successful", redirectUrl: "/" });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful", redirectUrl: "/dashboard" });
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

app.put('/updateUser/:email', async (req, res) => {
    const { email } = req.params;
    const { name, address, locality, statecode, pin, status } = req.body;
    try {
        const updatedUser = await CreatedUsers.findOneAndUpdate(
            { email },
            { name, address, locality, statecode, pin, status },
            { new: true } // Return the updated document
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