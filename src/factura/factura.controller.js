import Producto from "../product/produc.model.js";
import Factura from "./factura.model.js";

export const generarFactura = async (req, res) => {
  const carrito = req.session.carrito || [];
  try {
    
    let totalFactura = 0;
    for (const item of carrito) {
      totalFactura += item.precio * item.cantidad;
    }

    totalFactura = Math.round(totalFactura * 100) / 100;

    const usuario = req.usuarios.id;

    const factura = new Factura({
      userId: usuario, 
      productos: carrito.map(item => ({
        productoId: item._id, 
        cantidad: item.cantidad,
        precioUnitario: item.precio
      })),
      total: totalFactura
    });

    await factura.save();

    for (const item of carrito) {
      const producto = await Producto.findById(item._id);
      producto.cantidad -= item.cantidad;
      await producto.save();
    }

    req.session.carrito = [];

    res.status(200).json({ 
        factura 
    });
  } catch (error) {
    res.status(500).json({ error: "Error al generar la factura" });
  }
};