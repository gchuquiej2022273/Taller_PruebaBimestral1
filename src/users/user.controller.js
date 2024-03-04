import bcryptjs from "bcryptjs";
import User from "../users/user.model.js";

export const userPost = async (req, res) => {
    const {name,email,password,role} = req.body;
    const user = new User({name,email,password,role});

    const salto = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salto);

    await user.save();

    res.status(200).json({
        user
    })
}