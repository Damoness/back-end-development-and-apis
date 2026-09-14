import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { inputCleaner, inputValidator } from './middleware.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// Middleware to parse form body
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.redirect('/form')
})

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));






// POST /submit: apply inputCleaner THEN inputValidator route middleware
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  // Final handler, respond with sanitized data
  res.send(`
    <h1>Submitted</h1>
    <p>Sanitized Username: ${req.body.username}</p>
    <p>Sanitized Comment: ${req.body.comment}</p>
  `);
});

app.listen(3000,()=>{
  console.log('Server is running on the port 3000.')
})