
export const validarRole = async(req, res, next) =>{
try{
    const usuarios = req.usuarios;

    if (usuarios.role == "CLIENT_ROLE") {
        return res.status(403).json({
            msg: "Access is denied"
        });
    }

    console.log(usuarios);
    next();
} catch (e) {
    console.log(e),
        res.status(401).json({
            msg: "Acceso denegado comuniquese con un administrador",
        });

}
}