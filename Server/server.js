import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'; // Import Nodemailer


// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://a1resumebuilder.netlify.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add allowed methods
    allowedHeaders: ['Content-Type'], // Add allowed headers
}));

// Email Sending Route

app.post('/api/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your receiving email
        subject: subject,
        text: message,
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
          user: process.env.EMAIL_USER, // your email address
          pass: process.env.EMAIL_PASS,       // your email password or app-specific password
        },
      });

    try {
        await transporter.sendMail(mailOptions); // transporter is configured in your nodemailer setup
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});





// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schema for Resume
const ResumeSchema = new mongoose.Schema({
    resumeId: String,
    userEmail: String,
    userName: String,
    Title: String,
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
    themeColor: String,
    summary: String,
    Experience: [
        {
            id: Number,
            title: String,
            companyName: String,
            city: String,
            state: String,
            startDate: String,
            endDate: String,
            currentlyWorking: Boolean,
            workSummary: String,
        },
    ],
    education: [
        {
            id: Number,
            universityName: String,
            startDate: String,
            endDate: String,
            degree: String,
            major: String,
            description: String,
        },
    ],
    skills: [
        {
            id: Number,
            name: String,
           
            level: String,
        },
    ],
});

const Resume = mongoose.model('Resume', ResumeSchema);

// API Routes

// Create a new resume
app.post('/api/user-resumes', async (req, res) => {
    console.log("post"+JSON.stringify(req.body));
    try {

        const newResume = new Resume(req.body);
        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user resumes by email
app.get('/api/user-resumes', async (req, res) => {
    try {
        const userEmail = req.query.userEmail; // Retrieve userEmail from query params
       
        if (!userEmail) {
            return res.status(400).json({ error: 'User email is required' });
        }
        const resumes = await Resume.find({ userEmail });
        res.status(200).json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a resume by ID
app.get('/api/user-resumes/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a resume by ID
app.put('/api/user-resumes/:id', async (req, res) => {
    

    try {
        // Use req.body or req.body.data depending on the payload structure
        const updateData = req.body.data || req.body;

        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            { $set: updateData }, // Use $set to explicitly update fields
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            console.log("Resume not found for ID:", req.params.id);
            return res.status(404).json({ error: 'Resume not found' });
        }
        console.log("Resume updated successfully:", updatedResume);
        res.status(200).json(updatedResume);
    } catch (err) {
        console.error("Error updating resume:", err);
        res.status(400).json({ error: err.message });
    }
});


// Delete a resume by ID
app.delete('/api/user-resumes/:id', async (req, res) => {
    try {
        const deletedResume = await Resume.findByIdAndDelete(req.params.id);
        if (!deletedResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
