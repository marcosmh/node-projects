const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
        //req.uid = uid;

        // leer el usuario que corresponde el id
        const usuario = await Usuario.findById({ _id: uid });

        // verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - El usuario no existe en la bd.'
            })
        }

        // verificar si el uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - estado: false.'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido.'
        });
    }




}


module.exports = {
    validarJWT
}