import Producto from "../product/produc.model.js";

export const productoPost = async (req, res) => {
    const { nameProducto, cantidad, precio, categoria } = req.body;
    const producto = new Producto({nameProducto, cantidad, precio, categoria});

    await producto.save();

    res.status(200).json({
        msg: "Producto agregado exitosamente",
        producto
    })
}