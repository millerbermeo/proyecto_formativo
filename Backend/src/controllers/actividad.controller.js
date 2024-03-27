import { pool } from "../database/conexion.js";

export const agregarActividad = async (req, res) => {
    try {
        const rol = req.user.rol;

        // Verificar si el usuario tiene el rol de administrador
        if (rol === 'administrador') {
            const { id_tipo_actividad, nombre_actividad, descripcion_actividad } = req.body;

            // Verificar si todos los datos necesarios están presentes
            if (!id_tipo_actividad || !nombre_actividad || !descripcion_actividad) {
                return res.status(400).json({ 'message': 'Faltan datos obligatorios para la actividad' });
            }

            // Insertar la nueva actividad en la base de datos
            const result = await pool.query(
                "INSERT INTO tu_tabla (id_tipo_actividad, nombre_actividad, descripcion_actividad) VALUES (?, ?, ?)",
                [id_tipo_actividad, nombre_actividad, descripcion_actividad]
            );

            // Devolver la actividad recién creada
            return res.status(201).json({ 'message': 'Actividad creada satisfactoriamente', 'data': result });
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};
export const estadoActividad = async (req, res) => {
    try {
        const { id_actividad, nuevo_estado } = req.body;

        // Verificar si todos los datos necesarios están presentes
        if (!id_actividad || !nuevo_estado) {
            return res.status(400).json({ 'message': 'Faltan datos obligatorios para cambiar el estado de la actividad' });
        }

        // Verificar si el nuevo estado es válido (En Proceso o Terminada)
        if (nuevo_estado !== 'En Proceso' && nuevo_estado !== 'Terminada') {
            return res.status(400).json({ 'message': 'El nuevo estado debe ser "En Proceso" o "Terminada"' });
        }

        // Actualizar el estado de la actividad
        const result = await pool.query(
            "UPDATE actividades SET estado_actividad = ? WHERE id_actividad = ?",
            [nuevo_estado, id_actividad]
        );

        // Verificar la actividad y se actualizó correctamente
        if (result.affectedRows === 0) {
            return res.status(404).json({ 'message': 'No se encontró ninguna actividad con el ID proporcionado' });
        }

        return res.status(200).json({ 'message': 'Estado de la actividad actualizado correctamente' });
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};
