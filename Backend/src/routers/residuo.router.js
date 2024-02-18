//RUTAS MILLER

import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { registrarMovimiento, registrarResiduo, registrarSalida } from "../controllers/residuo.controller.js";

const router = Router()

router.post('/registrar', validarToken, registrarResiduo)
router.post('/registrarmov', validarToken, registrarMovimiento)
router.post('/registrarsal/:id', validarToken, registrarSalida)

export default router