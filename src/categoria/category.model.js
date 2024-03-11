import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema({

    nameCategory: {
        type: String,
        required: [true, "El nombre de la categoria es obligatoria"],
    },

    status: {
        type: Boolean,
        default: true
    },

    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'producto',
    }],

});

export default mongoose.model('categoria', categorySchema);