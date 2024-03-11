import bcryptjs from "bcryptjs";
import Usuario from "../users/user.model.js";
import Factura from "../factura/factura.model.js";
import Producto from "../product/produc.model.js";

export const userPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    const salto = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salto);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuarioPut = async (req, res) => {
    const usuarios = req.usuarios;

    const { _id, email, password, status, role, myRecord, ...resto } = req.body;

    if (password) {
        const salto = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salto);
    }
    await Usuario.findByIdAndUpdate(usuarios.id, resto);

    const usuario = await Usuario.findOne({ _id: usuarios.id });
    res.status(200).json({
        msg: "usuario actualizado",
        usuario
    })
}

export const usuarioDelete = async (req, res) => {

    const usuarios = req.usuarios;

    const usuario = await Usuario.findOneAndUpdate(
        { _id: usuarios._id },
        { $set: { status: false } },
    )

    res.status(200).json({
        msg: "EL usuario a sido eliminado",
        usuario
    })
}

export const obtenerHistorialCompras = async (req, res) => {

    const userId = req.usuarios.id;
    const historialCompras = await Factura.find({ userId }).exec();

    res.status(200).json({
        historialCompras
    });
};