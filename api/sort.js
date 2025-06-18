
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/api/sort', (req, res) => {
    try {
        // Check if data field exists
        if (!req.body.data) {
            return res.status(400).json({ error: 'Missing "data" field in request body' });
        }

        // Convert string to array of characters
        const chars = req.body.data.split('');
        
        // Sort array alphabetically
        const sortedChars = chars.sort();
        
        // Return the sorted array as a word
        res.json({ word: sortedChars });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

// Add a root route for testing if server is running
app.get('/', (req, res) => {
    res.send('Server is running. Send POST requests to /api/sort');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Export the Express app for Vercel
module.exports = app;