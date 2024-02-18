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
    badRequest: 400,
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
        const { id_residuo, cantidad, usuario_adm, fk_actividad } = req.body;


        if (!Number.isInteger(id_residuo) || !Number.isInteger(cantidad) || !Number.isInteger(usuario_adm) || !Number.isInteger(fk_actividad)) {
            return res.status(HTTP_STATUS.badRequest).json({ 'message': 'id_residuo, cantidad, usuario_adm y fk_actividad deben ser números enteros' });
        }        


        // Iniciar transacción
        await pool.query('START TRANSACTION');

        let query = `SELECT * from residuos WHERE id_residuo = ?`;

        // Ejecutar la consulta SQL

        let [result] = await pool.query(query, id_residuo);
        let almacenamiento = result[0].fk_alm;
        console.log(almacenamiento)

        let query_1 = `UPDATE residuos SET cantidad = cantidad + '${cantidad}' WHERE id_residuo = ?`
        await pool.query(query_1, [id_residuo]);


        let query_2 = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, fk_actividad) VALUES ('entrada', ?, CURDATE(), ?, ?, ?)`;

        // Ejecutar la 2da consulta SQL
        await pool.query(query_2, [cantidad, usuario_adm, id_residuo, fk_actividad]);


        let query_3 = `UPDATE almacenamiento SET cantidad_alm = cantidad_alm + '${cantidad}' WHERE id_almacenamiento = ?`
        await pool.query(query_3, [almacenamiento]);


        let query_4 = `UPDATE actividades SET estado_actividad = 'terminada' WHERE id_actividad  = ?`
        await pool.query(query_4, [fk_actividad]);

        // Confirmar transacción
        await pool.query('COMMIT');

        return res.status(HTTP_STATUS.ok).json({ 'message': 'Movimiento registrado correctamente' });
    } catch (error) {
        // Manejo de errores
        console.error('Error en registrarMovimiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};




export const registrarResiduo = async (req, res) => {
    try {

        const rol = req.user.rol;


        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        //variables del body
        const { nombre_residuo, residuo, tipo_residuo, unidad_medida, fk_alm } = req.body;

  

        let query_1 = `INSERT INTO residuos (nombre_residuo, residuo, tipo_residuo, cantidad, unidad_medida, fk_alm) VALUES (?, ?, ?, ?, 0, ?)`;


        // Ejecutar la consulta SQL
        let [result] = await pool.query(query_1, [nombre_residuo, residuo, tipo_residuo, unidad_medida, fk_alm]);


        return res.status(HTTP_STATUS.ok).json({ 'message': 'Movimiento registrado correctamente' });
    } catch (error) {
        // Manejo de errores
        console.error('Error en registrarMovimiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};


export const registrarSalida = async (req, res) => {
    try {

        const rol = req.user.rol;

        const id_residuo = req.params.id

        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }
        
        //variables del body
        const { destino, usuario_adm } = req.body;


        // if (!Number.isInteger(id_residuo) || !Number.isInteger(cantidad) || !Number.isInteger(usuario_adm) || !Number.isInteger(fk_actividad)) {
        //     return res.status(HTTP_STATUS.badRequest).json({ 'message': 'id_residuo, cantidad, usuario_adm y fk_actividad deben ser números enteros' });
        // }        


        // Iniciar transacción
        await pool.query('START TRANSACTION');

        let query = `SELECT * from residuos WHERE id_residuo = ?`;

        // Ejecutar la consulta SQL

        let [result] = await pool.query(query, id_residuo);
        let almacenamiento = result[0].fk_alm;
        let cantidad = result[0].cantidad;

        console.log(almacenamiento)
        console.log(cantidad)

        let query_1 = `UPDATE residuos SET cantidad = '0' WHERE id_residuo = ?`
        await pool.query(query_1, [id_residuo]);


        let query_3 = `UPDATE almacenamiento SET cantidad_alm = '0' WHERE id_almacenamiento = ?`
        await pool.query(query_3, [almacenamiento]);


        let query_2 = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, fk_actividad) VALUES ('salida', ?, CURDATE(), ?, ?, ?)`;

        // Ejecutar la 2da consulta SQL
        await pool.query(query_2, [cantidad, usuario_adm, id_residuo, destino]);

        // Confirmar transacción
        await pool.query('COMMIT');

        return res.status(HTTP_STATUS.ok).json({ 'message': 'Movimiento registrado correctamente' });
    } catch (error) {
        // Manejo de errores
        console.error('Error en registrarMovimiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};
