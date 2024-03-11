
import express from "express";
import {agregarActividad} from "../controllers/actividad.controller.js"; 

const router = express.Router();

// Agregar una nueva actividad
router.post("/actividades", agregarActividad);

export default router;
