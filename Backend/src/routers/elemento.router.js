//RUTAS SEBAS
import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarElementos } from "../controllers/elementos.controller.js";

const router = Router();

// Ruta para listar elementos
router.get('/listar', validarToken, async (req, res) => {
    try {
        await listarElementos(req, res); 
    } catch (error) {
        console.error("Error al listar elementos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

export default router;
