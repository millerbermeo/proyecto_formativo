import { pool } from "../database/conexion.js";

export const agregarActividad = async (req, res) => {
    try {

        const {rol}  = req.user;

        // Verificar si el usuario tiene el rol de administrador
        if (rol === 'administrador') {
            
            const { tipo_actividad, nombre_act, lugar_actividad, fecha_actividad } = req.body;

        //Iniciar Transaccion
           await pool.query('START TRANSACTION')
           
           //Insertar la actividad
            const [actividadResult] = await pool.query(
                'INSERT INTO actividades (tipo_actividad, nombre_act, lugar_actividad, fecha_actividad) VALUES (?, ?, ?, ?)',
                [tipo_actividad, nombre_act,lugar_actividad, fecha_actividad]
            );

            const id_actividad = actividadResult.insertId;

            //Insertar usuarios de manera sincronica



            //confirmar
            await pool.query('COMMIT');

            res.status(201).json({success: true, message: 'actividad con usuarios terminada con exito'});
        } 
    } catch (error) {

        //Revertir en caso de error 
        await pool.query('ROLLBACK');

        console.error('Error al insertar actividad con usuarios:', error);
        res.status(500).json({ success: false, 'message': 'Error interno del servidor' + error});
    }
};
    export const actividadTerminada = async (req, res) => {
        try {
            const { rol } = req.usesr;

            if (rol ==='administrador') {
                let id = req.params.id
                let sql = `UPDATE actividades SET  estado_actividad = 'terminada' WHERE id_actividad = ${id} `

                await pool.query(sql)
                res.status(200).json({success: true, message: 'EstadoActualizado.'});
            } else {
                return res.status(403).json({'message': 'Error: usuario no autorizado'});
            }
        } catch (error) {
            console.error("Error actualizar estado:", error);
            res.status(500).json({ success: false,'message': 'Error interno del servidor'});
        }
    };

    export const actividadListarId = async (req, res) => {
        try {
            const { rol } = req.user;
            if (rol ==='administrador') {
                let id = req.params.id
                const query = 'SELECT * from actividades WHERE id_actividad = ?'
                const [result] = await pool.query(query, [id])

                if (result.legth > 0){
                    return res.status(200).json(result);
                } else {
                    return res.status(403).json({'message': `No se encontraron registros de actividades con el id ${id}`});
                }
            } else {
                return res.status(403).json({'message': 'Error: usuario no autorizado'});
            }
        } catch (error) {
            return res.status(500).json({'message': 'Error: ' + e})
        }
    };
