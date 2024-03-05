import bcryptjs from "bcryptjs";
import Usuario from "../users/user.model.js";

export const userPost = async (req, res) => {
    const {name,email,password,role} = req.body;
    const usuario = new Usuario({name,email,password,role});

    const salto = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salto);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}