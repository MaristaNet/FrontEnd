import React, { useState } from "react";
import { uploadFile } from "../firebase-config"; 
const UploadPhoto = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor selecciona un archivo primero.");
      return;
    }
    try {
      await uploadFile(file);
      alert("Archivo subido con éxito.");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Hubo un error al subir el archivo.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Foto</button>
    </div>
  );
};

export default UploadPhoto;
