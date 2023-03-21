const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al hacer el login.'
        })
    }
}

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);
    
        let usuario = await Usuario.findOne({ correo });
        if(!usuario) {
            // crear usuario
            const data = {
                nombre,
                correo,
                password: '1X1X1X',
                img,
                rol: 'USER_ROLE',
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en bd es false
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Contacte a su AAdministrador, usuario bloqueado.'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        console.log(usuario);
        console.log(token);

        res.json({
            usuario,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar.'
        })
    }

    


}

module.exports = {
    login,
    googleSignIn
}