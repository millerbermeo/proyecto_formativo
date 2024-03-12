//RUTAS MILLER

import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { actualizarResiduoId, buscarResiduoId, listarActividades, listarAdmin, listarAlmacenamientos, listarMovimientos, listarResiduo, listarTiposResiduos, registrarAlmacenamiento, registrarEmpresas, registrarMovimiento, registrarResiduo, registrarSalida } from "../controllers/residuo.controller.js";
import { body } from 'express-validator';


const router = Router()

router.post('/registrar', validarToken, [
    body('nombre_residuo').notEmpty().isString(),
    body('residuo').notEmpty().toInt().isInt(),
    body('tipo_residuo').notEmpty().toInt().isInt(),
    body('cantidad').notEmpty().toInt().isInt(),
    body('unidad_medida').notEmpty().toInt().isInt(),
    body('fk_alm').notEmpty().toInt().isInt()  
], registrarResiduo);



router.post('/registrarmov', validarToken, registrarMovimiento)



router.post('/registrarsalida/:id', validarToken,[
    body('destino').notEmpty().toInt().isInt(),
    body('usuario_adm').notEmpty().toInt().isInt()
] ,registrarSalida)




router.post('/registraralm', validarToken, [
    body('nombre_alm').notEmpty().isString()
] ,registrarAlmacenamiento)


router.post('/registrarempresa', validarToken,[
    body('nombre_empresa').notEmpty().isString(),
    body('descripcion_empresa').notEmpty().isString(),
    body('contacto_empresa').notEmpty().isString()
],registrarEmpresas)

router.put('/actualizar/:id', validarToken,[
    body('nombre_residuo').notEmpty().isString(),
    body('residuo').notEmpty().toInt().isInt(),
    body('tipo_residuo').notEmpty().toInt().isInt(),
    body('cantidad').notEmpty().toInt().isInt(),
    body('unidad_medida').notEmpty().toInt().isInt(),
    body('fk_alm').notEmpty().toInt().isInt()
] ,actualizarResiduoId)


router.get('/listar', validarToken, listarResiduo)
router.get('/listar_mov', validarToken, listarMovimientos)
router.get('/listar_tipos', validarToken, listarTiposResiduos)
router.get('/listar_alm', validarToken, listarAlmacenamientos)
router.get('/buscar/:id', validarToken, buscarResiduoId)

router.get('/listar_admin', validarToken, listarAdmin)
router.get('/listar_actividad', validarToken, listarActividades)

export default router