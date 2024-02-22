//RUTAS MILLER

import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { actualizarResiduoId, buscarResiduoId, registrarMovimiento, registrarResiduo, registrarSalida } from "../controllers/residuo.controller.js";

const router = Router()

router.post('/registrar', validarToken, registrarResiduo)
router.post('/registrarmov', validarToken, registrarMovimiento)
router.post('/registrarsalida/:id', validarToken, registrarSalida)
router.put('/actualizar/:id', validarToken, actualizarResiduoId)
router.get('/buscar/:id', validarToken, buscarResiduoId)

export default router