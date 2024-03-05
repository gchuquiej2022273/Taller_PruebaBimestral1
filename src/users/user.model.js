import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "The name is mandatory uwu"],
    },

    email: {
        type: String,
        required: [true, "the email is mandatory"],
      //  unique: true,
    },

    password: {
        type: String,
        required: [true, "the password is mandatory"],
    },

    status: {
        type: Boolean,
        default: true
    },

    myRecord: {
        type: [String]
    },

    role: {
        type: String,
        default: "CLIENT_ROLE"
    }

});

export default mongoose.model('User', userSchema);