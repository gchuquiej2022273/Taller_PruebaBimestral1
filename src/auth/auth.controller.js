import bcryptjs from "bcryptjs";
import Usuario from "../users/user.model.js";
import UsuarioA from "../usersAdmin/userA.model.js";
import {generarJwt} from "../helpers/generar-jwt.js";

export const auth = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        const usuarioA = await UsuarioA.findOne({ email });

        const usuariosIn = (usuario || usuarioA);

        if (!usuariosIn) {
            return res.status(400).json({
                msg: "The user is not registered",
            });
        }

        if (!usuariosIn.status) {
            return res.status(400).json({
                msg: "El usuario no existe",
            });
        }

        const validarClave = bcryptjs.compareSync(password, usuariosIn.password);

        if (!validarClave) {
            return res.status(400).json({
                msg: "the password is invalid",
            })
        }

        const token = await generarJwt(usuariosIn.id);

        res.status(200).json({
            msg: "Bienvendio!!",
            usuariosIn,
            token
        });

    } catch (e) {
        console.log(e),
            res.status(500).json({
                msg: "comuniquese con el administrador"
            })
    }
}