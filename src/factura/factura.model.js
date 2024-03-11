import mongoose from "mongoose";

const facturaSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    productos: [{
        productoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'producto'
        },
        cantidad: Number,
        precioUnitario: Number
    }],

    total: Number,
    fecha: { type: Date, 
        default: Date.now() }
});

export default mongoose.model("Factura", facturaSchema);