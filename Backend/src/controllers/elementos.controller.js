//CONTROLADOR SEBAS
import { pool } from "../database/conexion.js";

export const listarElementos = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            // Realizar la consulta para obtener la lista de elementos
            const query = "SELECT * FROM elementos";
            const result = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result); // Devolver la lista de elementos si se encontraron registros
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de elementos' }); // No se encontraron registros de elementos
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' }); // Mensaje de usuario no autorizado
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); // Error interno del servidor
    }
};
