import express from "express";
import { agregarActividad, estadoActividad, listarActividad } from "../controllers/actividad.controller.js"; 
import { validarToken } from "../controllers/validator.controller.js";

const router = express.Router();

// Agregar una nueva actividad
router.get("/listar", validarToken, listarActividad);
router.post("/actividades", validarToken, agregarActividad);
router.post("/estado", validarToken, estadoActividad);

export default router;
