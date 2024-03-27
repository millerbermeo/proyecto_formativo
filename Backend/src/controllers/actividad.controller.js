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
            const { rol } = req.user;

            if (rol ==='administrador') {
                let id = req.params.id
                let sql = `UPDATE actividades SET  estado_actividad = 'terminada' WHERE id_actividad = ${id} `

                await pool.query(sql)
                res.status(200).json({success: true, message: 'Estado Actualizado.'});
            } else {
                return res.status(403).json({'message': 'Error: usuario no autorizado'});
            }
        } catch (error) {
            console.error("Error actualizar estado:", error);
            res.status(500).json({ success: false,'message': 'Error interno del servidor' + error});
        }
    };

    export const actividadListarId = async (req, res) => {
        try {
            const { rol } = req.user;
            if (rol ==='administrador') {
                const id_actividad = req.params.id;
                const query = `select actividades.*,
                areas.nombre_area AS nombre_lugar
                from actividades
                join areas on areas.id_lugar = actividades.lugar_actividad WHERE id_actividad = ?`;
                const [result] = await pool.query(query, [id_actividad])

                if (result.length > 0){
                    return res.status(200).json(result);
                } else {
                    return res.status(403).json({'message': `No se encontraron registros de actividades con el id ${id_actividad}`});
                }
            } else {
                return res.status(403).json({'message': 'Error: usuario no autorizado'});
            }
        } catch (error) {
            return res.status(500).json({'message': 'Error: ' + e})
        }
    };

    export const actividadListar = async (req, res) => {

        try {
            const { rol } = req.user;
    
            if (rol === 'administrador') {
    
                let query = `select actividades.*,
                areas.nombre_area AS nombre_lugar
                from actividades
                join areas on areas.id_lugar = actividades.lugar_actividad`;

                let [result] = await pool.query(query)
    
                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    return res.status(404).json({ 'message': 'No se encontraron registros de actividades' });
                }
    
            } else {
                return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
            }
        } catch (e) {
            return res.status(500).json({ 'message': 'Error: ' + e });
        }
    };


    export const actividadActualizar = async (req, res) => {
        try {
            const { rol } = req.user;
    
            if (rol === 'administrador') {
                const id_actividad = req.params.id;
                const { nombre_act, estado_actividad, lugar_actividad, fecha_actividad } = req.body;
    
                const sql = `UPDATE actividades SET nombre_act = ?, estado_actividad = ?, lugar_actividad = ?, fecha_actividad = ? WHERE id_actividad = ?`;
    
                await pool.query(sql, [nombre_act, estado_actividad, lugar_actividad, fecha_actividad, id_actividad]);
    
                res.status(200).json({ success: true, message: 'Actividad Actualizada.' });
            } else {
                return res.status(403).json({ message: 'Error: usuario no autorizado' });
            }
        } catch (error) {
            console.error("Error actualizar actividad:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor." });
        }
    };
    
    
