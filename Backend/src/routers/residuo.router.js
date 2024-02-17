//RUTAS MILLER

import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { registrarMovimiento, registrarResiduo } from "../controllers/residuo.controller.js";

const router = Router()

router.post('/registrar', validarToken, registrarResiduo)
router.post('/registrarmov', validarToken, registrarMovimiento)

export default router