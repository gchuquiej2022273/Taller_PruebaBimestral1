import Usuario from "../users/user.model.js";

export const existenteEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}