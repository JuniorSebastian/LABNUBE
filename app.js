const express = require('express');
const multer = require('multer');
const pool = require('./db');
const { uploadFile, deleteFile } = require('./s3');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Mostrar todos los productos
app.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos');
  res.render('index', { productos: rows });
});

// Formulario para crear
app.get('/crear', (req, res) => {
  res.render('crear');
});

// Crear producto
app.post('/crear', upload.single('imagen'), async (req, res) => {
  const { nombre, descripcion } = req.body;
  const result = await uploadFile(req.file);
  await pool.query('INSERT INTO productos (nombre, descripcion, imagen_url, imagen_key) VALUES (?, ?, ?, ?)', 
    [nombre, descripcion, result.Location, result.Key]);
  res.redirect('/');
});

// Formulario editar
app.get('/editar/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
  res.render('editar', { producto: rows[0] });
});

// Editar producto
app.post('/editar/:id', upload.single('imagen'), async (req, res) => {
  const { nombre, descripcion } = req.body;
  const id = req.params.id;

  if (req.file) {
    const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    await deleteFile(producto[0].imagen_key);
    const result = await uploadFile(req.file);
    await pool.query('UPDATE productos SET nombre = ?, descripcion = ?, imagen_url = ?, imagen_key = ? WHERE id = ?', 
      [nombre, descripcion, result.Location, result.Key, id]);
  } else {
    await pool.query('UPDATE productos SET nombre = ?, descripcion = ? WHERE id = ?', 
      [nombre, descripcion, id]);
  }

  res.redirect('/');
});

// Eliminar producto
app.post('/eliminar/:id', async (req, res) => {
  const id = req.params.id;
  const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  await deleteFile(producto[0].imagen_key);
  await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
