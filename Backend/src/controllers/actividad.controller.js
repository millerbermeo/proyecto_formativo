import { pool } from "../database/conexion.js";

export const agregarActividad = async (req, res) => {
    try {

        const {rol}  = req.user;

        // Verificar si el usuario tiene el rol de administrador
        if (rol === 'administrador') {
            
            const { tipo_actividad, nombre_act, estado_actividad, lugar_actividad, fecha_actividad, usuarios } = req.body;

        //Iniciar Transaccion
           await pool.query('START TRANSACTION')
           
           //Insertar la actividad
            const [actividadResult] = await pool.query(
                'INSERT INTO actividades (tipo_actividad, nombre_act, estado_actividad, lugar_actividad, fecha_actividad) VALUES (?, ?, ?, ?, ?)',
                [tipo_actividad, nombre_act, estado_actividad, lugar_actividad, fecha_actividad]
            );

            const id_actividad = actividadResult.insertId;

            //Insertar usuarios de manera sincronica

            for (const id_usuario of usuarios){
                await pool.query('INSERT INTO usuarios_actividades (fk_usuario, fk_actividad) VALUES (?, ?)', [id_usuario, id_actividad]);
            }

            //confirmar
            await pool.query('COMMIT');

            res.status(201).json({success: true, message: 'actividad con usuarios terminada con exito'});
        } 
    } catch (error) {

        //Revertir en caso de error 
        await pool.query('ROLLBACK');

        console.error('Error al insertar actividad con usuarios:', error);
        res.status(500).json({ success: false, 'message': 'Error interno del servidor'});
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
