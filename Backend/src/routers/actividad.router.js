import express from "express";
import { agregarActividad, actividadTerminada } from "../controllers/actividad.controller.js"; 

const router = express.Router();

// Agregar una nueva actividad
router.post("/actividad", agregarActividad);
router.put("/actividades", actividadTerminada);

export default router;
