import express from "express";
import { agregarActividad, actividadTerminada } from "../controllers/actividad.controller.js"; 
import { validarToken } from "../controllers/validator.controller.js";

const router = express.Router();

// Agregar una nueva actividad
router.post("/registrar", validarToken, agregarActividad);
router.put("/actualizarActividad", validarToken, actividadTerminada);

export default router;
