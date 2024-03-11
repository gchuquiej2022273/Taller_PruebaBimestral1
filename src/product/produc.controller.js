import Producto from "../product/produc.model.js";
import Categorias from "../categoria/category.model.js";

export const productoPost = async (req, res) => {
    const { nameProducto, cantidad, precio, categoria } = req.body;
    const producto = new Producto({ nameProducto, cantidad, precio, categoria });


    const actualizarCategoria = await Categorias.findOneAndUpdate(
        { nameCategory: categoria },
        { $addToSet: { productos: producto.id } },
    );

    await producto.save();

    res.status(200).json({
        msg: "Producto agregado exitosamente",
        producto,
        actualizarCategoria
    });
}

export const getProducto = async (req, res) => {
    const { nameProducto } = req.body;
    const producto = await Producto.findOne({ nameProducto, producStatus: true });

    if (!producto) {
        return res.status(400).json({
            msg: "EL producto no existe"
        });
    }

    res.status(200).json({
        producto
    })
}

export const getMasVendido = async (req, res) => {

    const producto = await Producto.find({ producStatus: true });

    res.status(200).json({
        producto
    })
}

export const getFiltrarCate = async (req, res) => {
    const { categoria } = req.body;

    const producto = await Producto.find({ categoria, producStatus: true });

    res.status(200).json({
        producto
    })
}

export const getAllProcuto = async (req, res) => {
    const producto = await Producto.find({ producStatus: true });

    res.status(200).json({
        producto
    })
}

export const getProducAgot = async (req, res) => {

        const producto = await Producto.find({ cantidad: 0, producStatus: true });

        res.status(200).json({
            msg: "Productos Agotados",
            producto
        })

}

export const putProducto = async(req, res) => {
    const {id} = req.params;
    const {_id,producStatus, ...resto} = req.body;

    await Producto.findByIdAndUpdate(id, resto);

    const actualizarCategoria = await Categorias.findOneAndUpdate(
        { nameCategory: resto.categoria },
        { $addToSet: { productos: id } },
    );

    const producto = await Producto.findOne({_id: id});

    res.status(200).json({
        msg: "Producto actualizado exitosamente",
        producto,
        actualizarCategoria
    });
}