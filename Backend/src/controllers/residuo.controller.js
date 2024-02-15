import { pool } from "../database/conexion.js";

// Constantes para mensajes y códigos de estado HTTP
const ERROR_MESSAGE = {
    unauthorized: 'Error: usuario no autorizado',
    notFound: 'No se encontraron registros de usuarios',
    internalServerError: 'Error interno del servidor'
};

const HTTP_STATUS = {
    ok: 200,
    unauthorized: 403,
    notFound: 404,
    internalServerError: 500
};



export const registrarMovimiento = async (req, res) => {
    try {

        const rol = req.user.rol;


        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        //variables del body
        const {cantidad, usuario_adm, fk_actividad, nombre_residuo, residuo, tipo_residuo, unidad_medida, fk_alm, destino} = req.body;

        let id_residuo;

        // Iniciar transacción
        await pool.query('START TRANSACTION');


        let query_1 = `INSERT INTO residuos (nombre_residuo, residuo, tipo_residuo, cantidad, unidad_medida, fk_alm) VALUES (?, ?, ?, ?, ?, ?)`;


        // Ejecutar la consulta SQL
        let [result] = await pool.query(query_1, [nombre_residuo, residuo, tipo_residuo, cantidad, unidad_medida, fk_alm]);
        id_residuo = result.insertId;

        
        let query_2 = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, fk_actividad) VALUES ('entrada', ?, CURDATE(), ?, ?, ?)`;

        // Ejecutar la consulta SQL
        await pool.query(query_2, [cantidad, usuario_adm, id_residuo, fk_actividad]);



        // Confirmar transacción
        await pool.query('COMMIT');

        return res.status(HTTP_STATUS.ok).json({ 'message': 'Movimiento registrado correctamente' });
    } catch (error) {
        // Manejo de errores
        console.error('Error en registrarMovimiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};
