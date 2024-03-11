import Jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';
import UsuarioA from '../usersAdmin/userA.model.js';
export const validarJwt = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token el la peticion",
        });
    }

    try {
        const { uid } = Jwt.verify(token, process.env.KEYPRIVATE);
        const usuario = await Usuario.findById(uid);
        const usuarioA = await UsuarioA.findById(uid);

        const usuarios = (usuario || usuarioA);

        if (!usuarios) {
            return res.status(401).json({
                msg: "Usuario no existe en la base de datos"
            });
        }

        if (!usuarios.status) {
            return res.status(401).json({
                msg: "El usuario no existe en la base de datos"
            });
        }

        req.usuarios = usuarios;

        next();
    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "Token no valido",
            });

    }

}