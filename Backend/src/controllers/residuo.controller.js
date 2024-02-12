import { pool } from "../database/conexion.js";

export const nombreFuncion = async (req, res) => {

    try {

        // const rol = req.user;
        // if (rol === 'administrador') {

        let query = 'SELECT * FROM usuarios'

        let [result] = await pool.query(query)
          

            if (result.length > 0) {

                return res.status(200).json(result); // se valida si este mensaje si la consulta esta bien

            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de usuarios' }); // se valida si da algun error 
            }


        // } else {
        //     return res.status(403).json({ 'message': 'Error: usuario no autorizado' }); //mensaje de usuario no autorizado
        // }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });

    }
}