const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Variable para el bucket activo, inicializado desde .env pero puede cambiarse dinámicamente
let activeBucket = process.env.AWS_BUCKET_NAME;

// Cambiar bucket activo (puedes exportar esta función para usarla desde el backend)
function setActiveBucket(bucketName) {
  activeBucket = bucketName;
}

// Subir archivo al bucket activo
function uploadFile(file) {
  const params = {
    Bucket: activeBucket,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
  };
  return s3.upload(params).promise();
}

// Eliminar archivo del bucket activo
function deleteFile(key) {
  const params = {
    Bucket: activeBucket,
    Key: key
  };
  return s3.deleteObject(params).promise();
}

// Listar archivos de cualquier bucket (para backup o restaurar)
function listFiles(bucketName) {
  const params = { Bucket: bucketName };
  return s3.listObjectsV2(params).promise();
}

// Copiar archivo de un bucket a otro
function copyFile(sourceBucket, destinationBucket, key) {
  const params = {
    Bucket: destinationBucket,
    CopySource: `${sourceBucket}/${key}`,
    Key: key
  };
  return s3.copyObject(params).promise();
}

module.exports = {
  uploadFile,
  deleteFile,
  listFiles,
  copyFile,
  setActiveBucket,
};
