const { request, response } = require("express");


const validarArchivo = (req = request, res = res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No hay archivos por subir.'
        });
      }
      next();
}


module.exports = {
    validarArchivo
}