import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";

import { categoriaPost, categoriaDelete ,getCategoria, putCategoria} from "./category.controller.js";

import { existeCategoria } from "../helpers/db-validator.js";

import { validarJwt } from "../middlewares/validar-jwt.js";

import { validarRole } from "../middlewares/validar-role.js";

const router = Router();

router.post(
    "/",
    [
        validarJwt,
        validarRole,
        check("nameCategory", "The name is mandatory").not().isEmpty(),
        check("nameCategory").custom(existeCategoria),
        validarCampos,
    ], categoriaPost);

router.delete(
    "/delete",
    [
        validarJwt,
        validarRole,
        check("nameCategory", "The name is mandatory").not().isEmpty(),
        validarCampos,
    ], categoriaDelete);

router.get(
    "/categoriaGet",
    validarJwt,
    validarRole,
    getCategoria
)

router.put(
    "/:id",
    [
        validarJwt,
        validarRole,
        check("nameCategory", "El nombre is necesario para actualizar").not().isEmpty(),
        validarCampos,
    ],putCategoria);
export default router;