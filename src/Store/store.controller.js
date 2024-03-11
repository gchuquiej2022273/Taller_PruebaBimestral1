import Producto from "../product/produc.model.js";

export const verProducto = async (req, res) => {
  const producto = await Producto.find({ producStatus: true });

  res.status(200).json({
    producto
  })
}

export const agregarCarrito = async (req, res) => {
  const productId = req.params.id;
  const cantidad = req.body.cantidad;
  try {
    const producto = await Producto.findById(productId);
    if (!producto) {
      return res.status(404).json({
        msg: 'Producto no encontrado'
      });
    }

    req.session.carrito = req.session.carrito || [];
    req.session.carrito.push({ ...producto.toObject(), cantidad });
    res.status(200).json({
      msg: "Producto agregado al carrito"
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al agregar el producto al carrito'
    });
  }
}

export const verCarrito = async (req, res) => {
  const carrito = req.session.carrito || [];
  res.status(200).json({
    carrito
  })
}