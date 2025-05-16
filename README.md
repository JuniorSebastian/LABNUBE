# LABNUBE

**Backend Node.js con CRUD de productos, almacenamiento de imágenes en AWS S3, base de datos MySQL en la nube y despliegue en Render.**

---

## 🔥 Descripción

Este proyecto permite gestionar productos con imágenes subidas directamente desde el navegador.  
Las imágenes se almacenan en AWS S3, y la información del producto (incluyendo la URL de la imagen) se guarda en una base de datos MySQL alojada en Clever Cloud.  
Todo esto está desplegado en Render para tener la aplicación funcionando en la nube.

---

## 📋 Tecnologías usadas

- Node.js
- Express.js
- MySQL (Clever Cloud)
- AWS S3 (almacenamiento de imágenes)
- Render (hosting y despliegue)
- Multer (manejo de uploads)
- dotenv (variables de entorno)

---

## 🚀 Cómo usar este proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuniorSebastian/LABNUBE.git
cd LABNUBE


2. Instalar dependencias

npm install


3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con estas variables (reemplaza con tus propios datos):

DB_HOST=tu-host-mysql
DB_USER=tu-usuario-mysql
DB_PASSWORD=tu-password-mysql
DB_NAME=tu-base-de-datos
DB_PORT=3306

AWS_ACCESS_KEY_ID=tu-access-key-aws
AWS_SECRET_ACCESS_KEY=tu-secret-key-aws
AWS_REGION=us-east-1
AWS_BUCKET_NAME=tu-bucket-s3
AWS_BACKUP_BUCKET_NAME=tu-bucket-backup


4. Crear la tabla en MySQL
Conéctate a tu base de datos MySQL y ejecuta esta consulta para crear la tabla productos:


CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  descripcion TEXT,
  precio DECIMAL(10,2),
  imagen_url TEXT,
  imagen_key VARCHAR(255)
);


5. Ejecutar el servidor localmente

node app.js


El servidor estará escuchando en http://localhost:3000 (o el puerto que configures).



☁️ Despliegue en Render
Crear un nuevo Web Service en Render:

Seleccionar entorno: Node.js

Conectar tu repo de GitHub

Branch: main

Build command: npm install

Start command: node app.js

Agregar todas las variables de entorno desde tu archivo .env.

Desplegar y probar el endpoint.

🔑 Uso de AWS S3
El proyecto usa el AWS SDK para subir imágenes a un bucket S3.

Se guarda el key y la URL de la imagen en la base de datos.

Verifica que los buckets estén correctamente creados y configurados en la región indicada (AWS_REGION).

🛠 Errores comunes y soluciones
Missing required key 'Bucket': Asegúrate de haber definido AWS_BUCKET_NAME en las variables de entorno.

Unknown column 'imagen_key': La columna imagen_key debe estar creada en tu tabla productos.


