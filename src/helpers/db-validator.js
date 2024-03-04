import User from "../users/user.model.js";

export const emailValido = async (email = '') => {
    const existeEmail = await User.findOne({ email });

    console.log(existeEmail);
    if (existeEmail) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}