import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;


app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'src/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/images', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ningún archivo.' });
  }
  res.status(200).json({ 
    message: 'Imagen subida con éxito', 
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

app.get('/images', (req, res) => {
  const uploadPath = path.join(__dirname, 'src/uploads');
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el directorio de imágenes.' });
    }
    
    const images = files.map(file => ({
      id: file, 
      filename: file,
      title: file, 
      alt_text: '', 
      url: `/uploads/${file}` 
    }));

    res.status(200).json(images);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
