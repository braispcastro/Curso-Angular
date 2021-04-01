const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async (req = request, res = response) => {

    const { name, email, password } = req.body;

    try {

        // Verificar el email
        const usuario = await Usuario.findOne({email: email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })
        }

        //Crear usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Cifrar la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar JWT
        const token = await generarJWT(dbUser.id, name);

        // Crear usuario en la base de datos
        await dbUser.save();

        // Generar respuesta
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: name,
            token: token
        })
        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error. Por favor, hable con el administrador.'
        });
        
    }
    
}


const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({email: email});

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        // Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Respuesta
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token: token
        });

        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error. Por favor, hable con el administrador.'
        });
        
    }

}


const revalidarToken = async (req = request, res = response) => {

    const { uid, name } = req;

    const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        uid: uid,
        name: name,
        token: token
    });

}




module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}