import { Router } from "express";
import { generarFactura } from "./factura.controller.js";
import { validarJwt } from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/generar-factura",
    validarJwt,
    generarFactura);

export default router;