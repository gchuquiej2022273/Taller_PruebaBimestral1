import Usuario from "../users/user.model.js";
import UsuarioA from "../usersAdmin/userA.model.js"

import Producto from "../product/produc.model.js"

export const existenteEmail = async (email = '') => {
    const existeEmailuser = await Usuario.findOne({ email });
    const existeEmailAdmin = await UsuarioA.findOne({ email });

    if (existeEmailuser || existeEmailAdmin) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

/*modelo que va  a buscar en categoria si existe y retorna en las rutas*/
export const existeCategoria = async(categoria = '') => {
    const existeCategoria = await Producto.findOne({ categoria })
}