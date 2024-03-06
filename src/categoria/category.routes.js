import { Router } from "express";
import { check } from "express-validator";

import {validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("nameCategory", "The name is mandatory").not().isEmpty(),
        validarCampos,
        /*Se comenzo el enrutado para la creadion de un amongus */
    ]
)