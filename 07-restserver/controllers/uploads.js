const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response  } = require('express');
const { subirArchivo } = require('../helpers/subir-archivos');

const { Usuario, Producto } = require('../models');


const cargarArchivo = async(req = request, res = response) => {

  try {
    const nombre = await subirArchivo(req.files, undefined,'imgs');
    res.json({
      nombre
    });

  } catch(msg) {
     res.status(400).json({msg});
  }
  
}

const actualizarArchivo = async(req = request, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`
        });
      }
      
    break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`
        });
      }
      
    break;
  
    default:
      return res.status(500).json({msg: `Esta colecciòn ${coleccion} no esta permitida.`});
      
  }

  if(modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined,coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json({
    modelo
  });
}

const verArchivo = async(req = request, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`
        });
      }
      
    break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`
        });
      }
      
    break;
  
    default:
      return res.status(500).json({msg: `Esta colecciòn ${coleccion} no esta permitida.`});
      
  }

  
  if(modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const imgNotFound = path.join(__dirname, '../assets/no-image.jpeg');
  console.log(imgNotFound);

  //res.json({ msg: 'Falta place holder'});
  return res.sendFile(imgNotFound);

}

const actualizarArchivoCloudinary = async(req = request, res = response) => {
  console.log("actualizarArchivoCloudinary...");
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`
        });
      }
      
    break;

    case 'productos':
      modelo = await Producto.findById(id);
      if(!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`
        });
      }
      
    break;
  
    default:
      return res.status(500).json({msg: `Esta colecciòn ${coleccion} no esta permitida.`});
      
  }

  console.log('tiene img: ',modelo.img)
  if(modelo.img) {
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1 ];
    console.log(nombre);
    const [ public_id ] = nombre.split('.');
    console.log(public_id);
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  
  modelo.img = secure_url;
  await modelo.save();

  res.json({
    modelo
  });
}



module.exports = {
    cargarArchivo,
    actualizarArchivo,
    verArchivo,
    actualizarArchivoCloudinary
}
