import { pool } from "../database/conexion.js";

export const agregarActividad = async (req, res) => {
    try {
        const rol = req.user.rol;

        // usuario tiene el rol de administrador
        if (rol === 'administrador') {
            const { id_tipo_actividad, nombre_actividad, descripcion_actividad } = req.body;

            // datos necesarios estan presentes
            if (!id_tipo_actividad || !nombre_actividad || !descripcion_actividad) {
                return res.status(400).json({ 'message': 'Faltan datos obligatorios para la actividad' });
            }

            // Insertar la nueva actividad en la base de datos
            const result = await pool.query(
                "INSERT INTO tipos_actividades SET ?",
                [id_tipo_actividad, nombre_actividad, descripcion_actividad]
            );
// Devolver la actividad recién creada
            return res.status(201).json(result.rows[0]); 
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};
