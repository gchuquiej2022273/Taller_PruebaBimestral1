import { Router } from "express";
import { check } from "express-validator";

import {validarCampos} from "../middlewares/validar-campos.js";
import {existenteEmail} from "../helpers/db-validator.js";
import {userPost} from "../users/user.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("email").custom(existenteEmail),
        check("name", "the name is mandatory").not().isEmpty(),
        check("email", "the emais is incorected").isEmail(),
        check("password", "the password is menos de 6 caracteres").isLength({min: 6, }),
        validarCampos,
    ],userPost);

export default router;