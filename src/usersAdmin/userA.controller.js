import UsuarioA from "./userA.model.js";
import bcryptjs from "bcryptjs";


export const usuarioAdminPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const usuarioA = new UsuarioA({ name, email, password, role });

    console.log(usuarioA);
    
    const salto = bcryptjs.genSaltSync();
    usuarioA.password= bcryptjs.hashSync(password, salto);

    await usuarioA.save();

    res.status(200).json({
        msg: "Admin ingresado existosamente",
        usuarioA
    })
}