import { Router } from "express";
import { check } from "express-validator";

import {existenteEmail} from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";

import { usuarioAdminPost } from "./userA.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "The name is mandatory").not().isEmpty(),
        check("email", "The email is mandatory").isEmail(),
        check("password","La clase es menor a 6 caracteres").isLength({min:6}),
        check("email").custom(existenteEmail),
        validarCampos,
    ],usuarioAdminPost);

export default router;