import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { auth } from "./auth.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio").not().isEmpty(),
        validarCampos,
    ], auth);

export default router;