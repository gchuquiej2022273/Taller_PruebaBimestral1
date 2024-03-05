import mongoose from "mongoose";

const userASchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is mandatory"],
    },

    email: {
        type: String,
        required: [true, "The email is mandatory"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "the password is mandatory"],
    },

    role: {
        type: String,
        default: "ADMIN_ROLE"
    },

    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('userA', userASchema);