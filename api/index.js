const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json());

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve Static Files correctly for Vercel & Local
app.use(express.static(path.join(__dirname, '../public')));

// The Auto-Scanner Logic
function runScanner() {
    const demosPath = path.join(__dirname, '../public/demos');
    const projects = [];

    // Ensure directory exists
    if (!fs.existsSync(demosPath)) {
        console.error('Demos directory not found:', demosPath);
        return projects;
    }

    const items = fs.readdirSync(demosPath, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            const infoPath = path.join(demosPath, item.name, 'info.json');
            if (fs.existsSync(infoPath)) {
                try {
                    const infoData = fs.readFileSync(infoPath, 'utf8');
                    const info = JSON.parse(infoData);
                    // Add folder name as the id/url slug
                    projects.push({ ...info, slug: item.name });
                } catch (err) {
                    // CRASH PROOFING: Log but continue
                    console.warn(`[WARNING] Skipping ${item.name}: Invalid info.json`);
                }
            } else {
                console.warn(`[INFO] Skipping ${item.name}: No info.json found`);
            }
        }
    });

    // Sort alphabetically by title
    return projects.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

// Routes
app.get('/', (req, res) => {
    const projects = runScanner();
    res.render('home', { projects });
});

app.get('/contact', (req, res) => {
    res.render('contact', { msg: null });
});

app.post('/contact', async (req, res) => {
    const { name, email, projectType, budget, details } = req.body;

    // Output for debugging
    console.log('Received Form Submission:', req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'mp826416@gmail.com', // Target email
        subject: `New Quote Request: ${projectType} from ${name}`,
        text: `
            New Project Inquiry
            -------------------
            Name: ${name}
            Email: ${email}
            Type: ${projectType}
            Budget: ${budget}
            
            Details:
            ${details}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.render('contact', { msg: 'success' });
    } catch (error) {
        console.error('Email Error:', error);
        res.render('contact', { msg: 'error' });
    }
});

// 404 Catch-All Route (Must be last)
app.use((req, res) => {
    res.status(404).render('404');
});

// Start Server (Listen only if run directly, Vercel handles export)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
