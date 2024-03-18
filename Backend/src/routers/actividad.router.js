import express from "express";
import { agregarActividad, estadoActividad } from "../controllers/actividad.controller.js"; 

const router = express.Router();

// Agregar una nueva actividad
router.post("/actividad", agregarActividad);
router.post("/actividades/estado", estadoActividad);

export default router;
