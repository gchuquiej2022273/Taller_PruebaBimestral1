import mongoose from "mongoose";


const producSchemma = mongoose.Schema({

    nameProducto: {
        type: String,
        required: [true, "The product name is mandatory"],
    },

    cantidad: {
        type: String,
        required: [true, "The cantidad is mandatory"],
    },

    precio: {
        type: Number,
        required: [true, "El precio es de carácter obligatorio"],
    },

    categoria: {
        type: String,
        required: [true, "The categoria is mandatory"],
    },

    producStatus: {
        type: String,
        default: true
    },

});

export default mongoose.model("producto", producSchemma);