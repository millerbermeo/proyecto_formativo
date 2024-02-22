import { pool } from "../database/conexion.js";

// Constantes para mensajes y códigos de estado HTTP


const ERROR_MESSAGE = {
    unauthorized: 'Error: usuario no autorizado',
    notFound: 'No se encontraron registros',
    internalServerError: 'Error interno del servidor'
};

const HTTP_STATUS = {
    ok: 200,
    unauthorized: 403,
    notFound: 404,
    badRequest: 400,
    internalServerError: 500
};



export const obtenerAlmacenamientoId = async (id_residuo) => {
    let query = 'SELECT fk_alm FROM residuos WHERE id_residuo = ?';
    let [result] = await pool.query(query, [id_residuo]);
    if (result.length > 0) {
        return result[0].fk_alm;
    } else {
        // Manejar el caso en el que no se encuentre ningún resultado
        return null; // O puedes lanzar un error, dependiendo de tu lógica de negocio
    }
};

export const obtenerCantidad = async (id_residuo) => {
    let query = 'SELECT cantidad FROM residuos WHERE id_residuo = ?';
    let [result] = await pool.query(query, [id_residuo]);
    if (result.length > 0) {
        return result[0].cantidad;
    } else {
        // Manejar el caso en el que no se encuentre ningún resultado
        return null; // O puedes lanzar un error, dependiendo de tu lógica de negocio
    }
};


export const actualizarCantidadResiduo = async (cantidad, id_residuo, tipo) => {


    if (tipo == 'entrada') {
        let query = `UPDATE residuos set cantidad = cantidad + '${cantidad}' WHERE id_residuo = ?`
        await pool.query(query, [id_residuo])
    }

    if (tipo == 'salida') {
        let query = `UPDATE residuos set cantidad = '0' WHERE id_residuo = ?`
        await pool.query(query, [id_residuo])
    }
}

export const registrarMovSql = async (cantidad, usuario_adm, id_residuo, fk_actividad) => {
    let query = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, fk_actividad) VALUES ('entrada', ?, CURDATE(), ?, ?, ?)`;
    await pool.query(query, [cantidad, usuario_adm, id_residuo, fk_actividad]);
}

export const registrarMovSalida = async (cantidad, usuario_adm, id_residuo, destino) => {
    let query = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, destino) VALUES ('salida', ?, CURDATE(), ?, ?, ?)`;
    await pool.query(query, [cantidad, usuario_adm, id_residuo, destino]);
}


export const actualizarAlmacenamiento = async (cantidad, id_alm, tipo) => {

    if (tipo == 'entrada') {
        let query = `UPDATE almacenamiento SET cantidad_alm = cantidad_alm + ? WHERE id_almacenamiento = ?`;
        await pool.query(query, [cantidad, id_alm]);
    }

    if (tipo == 'salida') {
        let query = `UPDATE almacenamiento SET cantidad_alm = '0' WHERE id_almacenamiento = ?`;
        await pool.query(query, [id_alm]);
    }
};


export const actualizarActividad = async (fk_actividad) => {
    let query = `UPDATE actividades SET estado_actividad = 'terminada' WHERE id_actividad  = ?`
    await pool.query(query, [fk_actividad]);

}



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

        let id_alm = await obtenerAlmacenamientoId(id_residuo);
        console.log(id_alm)
        await actualizarCantidadResiduo(cantidad, id_residuo, "entrada")
        await registrarMovSql(cantidad, usuario_adm, id_residuo, fk_actividad)
        await actualizarAlmacenamiento(cantidad, id_alm, "entrada")
        await actualizarActividad(fk_actividad)


        // Confirmar transacción
        await pool.query('COMMIT');

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


        if (!Number.isInteger(destino) || !Number.isInteger(usuario_adm)) {
            return res.status(HTTP_STATUS.badRequest).json({ 'message': 'destino y usuario_adm deben ser números enteros' });
        }


        // Iniciar transacción
        await pool.query('START TRANSACTION');

        let id_alm = await obtenerAlmacenamientoId(id_residuo);
        let cantidad = await obtenerCantidad(id_residuo)
        console.log(cantidad, "-----")
        await actualizarCantidadResiduo(0, id_residuo, "salida")
        await registrarMovSalida(cantidad, usuario_adm, id_residuo, destino)
        await actualizarAlmacenamiento(0, id_alm, "salida")


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



export const buscarResiduoId = async (req, res) => {

    try {
        let id = req.params.id

        let query = `SELECT * FROM residuos WHERE id_residuo = ?`
        let [result] = await pool.query(query, [id])

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({'message': ERROR_MESSAGE.notFound})
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}

export const actualizarResiduoId = async (req, res) => {

    try {
        let id = req.params.id

        const { nombre_residuo, residuo, tipo_residuo, cantidad, unidad_medida, fk_alm } = req.body;

        let query = `UPDATE residuos SET nombre_residuo = '${nombre_residuo}', residuo = '${residuo}', tipo_residuo = '${tipo_residuo}', cantidad = '${cantidad}', unidad_medida = '${unidad_medida}', fk_alm  = '${fk_alm}' WHERE id_residuo = ${id}`
        let [result] = await pool.query(query)

        if (result.affectedRows > 0) {
            res.status(HTTP_STATUS.ok).json({"message" : "Actualizado correctamente"})
        } else {
            res.status(HTTP_STATUS.notFound).json(ERROR_MESSAGE.notFound)
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}

