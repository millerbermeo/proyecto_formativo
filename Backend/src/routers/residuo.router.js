//RUTAS MILLER

import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { registrarMovimiento } from "../controllers/residuo.controller.js";

const router = Router()

router.post('/registrar', validarToken, registrarMovimiento)

export default router