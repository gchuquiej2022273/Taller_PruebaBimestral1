import Categoria from "./category.model.js";
import Producto from "../product/produc.model.js";

export const categoriaPost = async (req, res) => {
  const nameCategory = req.body;
  const categoria = new Categoria(nameCategory);

  await categoria.save();

  res.status(200).json({
    msg: "La categorai fue agregada exitosamente",
    categoria
  })
}

export const getCategoria = async (req, res) => {
  const categoria = await Categoria.find({ status: true }).populate('productos');

  res.status(200).json({
    categoria
  })
}

export const putCategoria = async (req, res) => {
  const { id } = req.params;
  const { _id, status, productos, ...resto } = req.body;

  await Categoria.findByIdAndUpdate(id, resto);

  await Producto.updateMany({ categoria: resto.nameCategory });

  const categoria = await Categoria.findOne({ _id: id });

  res.status(200).json({
    msg: "categoria actualizada exitosamente",
    categoria
  })
}

export const categoriaDelete = async (req, res) => {

  const { nameCategory } = req.body;

  const categoria = await Categoria.findOne({ nameCategory });

  await Categoria.updateOne({ nameCategory }, { status: false });

  const newCategoria = await Categoria.findOne({ nameCategory: "sinCategoria" });
  if (!newCategoria) {
    await Categoria.create({ nameCategory: "sinCategoria", status: true });
  }
  await Producto.updateMany({ categoria: nameCategory }, { categoria: "sinCategoria" });

  Categoria.updateOne(
    { nameCategory: "sinCategoria" },
    { $set: { productos: categoria.productos }}
  )

res.status(200).json({
  msg: "Se ah eliminado",
});
}