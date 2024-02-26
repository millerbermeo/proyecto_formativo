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
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de elementos' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' }); 
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};
export const registrarElemento = async (req, res) => {
    try {
        const { nombre, tipo, cantidad } = req.body;

        // Realizar la inserción en la base de datos
        await pool.query("INSERT INTO elementos (nombre_elm, tipo_elm, cantidad) VALUES (?, ?, ?)", [nombre, tipo, cantidad]);

        res.status(201).json({ message: "Elemento registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar el elemento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};