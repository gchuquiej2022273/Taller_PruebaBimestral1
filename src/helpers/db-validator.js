import Usuario from "../users/user.model.js";
import UsuarioA from "../usersAdmin/userA.model.js";
import Categoria from "../categoria/category.model.js";
import Producto from "../product/produc.model.js";

export const existenteEmail = async (email = '') => {
    const existeEmailuser = await Usuario.findOne({ email });
    const existeEmailAdmin = await UsuarioA.findOne({ email });

    if (existeEmailuser || existeEmailAdmin) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

export const existeCategoria = async(nameCategory = '') => {
    const existeCategoria = await Categoria.findOne({ nameCategory });

    if (existeCategoria) {
        throw new Error(`La categoria ${nameCategory} ya se encuentra registrado`);
    }
}

 export const noExiteCategoria = async(nameCategory = '') => {
    const noExiteCategoria = await Categoria.findOne({ nameCategory });

    if (!noExiteCategoria) {
        throw new Error(`La categoria ${nameCategory} No se encuentra registrado`);
    }
 }

 export const existeProducto = async(nameProducto = '') =>{
    const existeProducto = await Producto.findOne({nameProducto});

    if (existeProducto) {
        throw new Error(`El producto ${nameProducto} ya se encuentra registrado`);

    }
 }