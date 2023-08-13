import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
// Use cors only for specific routes
//app.use('/generate-qr', cors());
import cors from 'cors';

// ...

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// ...


// Serve static files (frontend)
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-qr', (req, res) => {
  const url = req.body.url;
  const qr_svg = qr.image(url, { type: 'png' });

  // Set the absolute path to the qr_image.png file
  const qrImageFilePath = path.join(__dirname, 'public', 'qr_image.png');
  qr_svg.pipe(fs.createWriteStream(qrImageFilePath));

  res.json({ qrImage: 'qr_image.png' }); // Send the filename back to the frontend
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
