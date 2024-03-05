import Usuario from "../users/user.model.js";
import UsuarioA from "../usersAdmin/userA.model.js"

export const existenteEmail = async (email = '') => {
    const existeEmailuser = await Usuario.findOne({ email });
    const existeEmailAdmin = await UsuarioA.findOne({ email });

    if (existeEmailuser || existeEmailAdmin) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}