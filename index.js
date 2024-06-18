const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route for serving index.html (entry point of your Vue.js app)
// This handles all routes on the client-side (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
