-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2024 a las 12:27:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sqlproyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id_actividad` int(11) NOT NULL,
  `tipo_actividad` enum('recoleccion','otras') DEFAULT NULL,
  `nombre_act` varchar(30) DEFAULT NULL,
  `estado_actividad` enum('asignada','terminada') DEFAULT 'asignada',
  `lugar_actividad` int(11) DEFAULT NULL,
  `fecha_actividad` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id_actividad`, `tipo_actividad`, `nombre_act`, `estado_actividad`, `lugar_actividad`, `fecha_actividad`) VALUES
(3, 'recoleccion', 'actividad 1', 'terminada', 2, '2024-03-02 15:59:27'),
(4, 'recoleccion', 'actividad 3', 'asignada', 3, '2024-03-16 17:43:14'),
(5, 'recoleccion', 'nombre', 'asignada', NULL, '2024-03-18 05:15:16'),
(6, 'recoleccion', 'hola 1234', 'asignada', 2, '2024-03-18 05:16:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `almacenamiento`
--

CREATE TABLE `almacenamiento` (
  `id_almacenamiento` int(11) NOT NULL,
  `nombre_alm` varchar(255) DEFAULT NULL,
  `cantidad_alm` int(11) DEFAULT 0,
  `stock_alm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `almacenamiento`
--

INSERT INTO `almacenamiento` (`id_almacenamiento`, `nombre_alm`, `cantidad_alm`, `stock_alm`) VALUES
(1, 'bodega plastico', 20, 0),
(2, 'bodega metal', 0, 0),
(3, 'bodega carton', 0, 0),
(4, 'bodega vidrio', 0, 0),
(5, 'bodega no aprovechables\r\n', 0, 0),
(6, 'bodega peligrosos\r\n', 0, 0),
(7, 'bodega quimicos\r\n', 0, 0),
(8, 'biofabrica', 0, 0),
(9, 'alm prueba', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_lugar` int(11) NOT NULL,
  `nombre_area` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_lugar`, `nombre_area`) VALUES
(1, 'area 1'),
(2, 'area 2'),
(3, 'area 3'),
(4, 'area 4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos`
--

CREATE TABLE `elementos` (
  `id_elemento` int(11) NOT NULL,
  `nombre_elm` varchar(255) DEFAULT NULL,
  `tipo_elm` varchar(255) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elementos`
--

INSERT INTO `elementos` (`id_elemento`, `nombre_elm`, `tipo_elm`, `cantidad`) VALUES
(2, 'Escoba', 'herramienta', 5),
(6, 'hola', 'herramienta', 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_actividades`
--

CREATE TABLE `elementos_actividades` (
  `id_elm_act` int(11) NOT NULL,
  `fk_actividad` int(11) NOT NULL,
  `fk_elemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas_recoleccion`
--

CREATE TABLE `empresas_recoleccion` (
  `id_empresa` int(11) NOT NULL,
  `nombre_empresa` varchar(50) DEFAULT NULL,
  `descripcion_empresa` text DEFAULT NULL,
  `contacto_empresa` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas_recoleccion`
--

INSERT INTO `empresas_recoleccion` (`id_empresa`, `nombre_empresa`, `descripcion_empresa`, `contacto_empresa`) VALUES
(1, 'empresa 1', 'es una empresa encarga de solidos', '3143594582'),
(2, 'empresa 2', 'es una empresa encarga de solidos 2', '3143594582'),
(3, 'prueba empresa', 'SE ENCARGA', 'prueba empresa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugares`
--

CREATE TABLE `lugares` (
  `id_lugar` int(11) NOT NULL,
  `nombre_lugar` varchar(50) NOT NULL,
  `ubicacion_lugar` varchar(50) NOT NULL,
  `fk_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `id_movimiento` int(11) NOT NULL,
  `tipo_movimiento` enum('entrada','salida') DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `usuario_adm` int(11) DEFAULT NULL,
  `fk_residuo` int(11) DEFAULT NULL,
  `fk_actividad` int(11) DEFAULT NULL,
  `destino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`id_movimiento`, `tipo_movimiento`, `cantidad`, `fecha`, `usuario_adm`, `fk_residuo`, `fk_actividad`, `destino`) VALUES
(4, 'salida', 350, '2024-03-02', 1, 1, NULL, 1),
(44, 'entrada', 21, '2024-03-16', 2, 5, 4, NULL),
(48, 'salida', 2698, '2024-03-17', 2, 1, NULL, 3),
(49, 'salida', 119, '2024-03-17', 41, 3, NULL, 2),
(50, 'salida', 24, '2024-03-17', 2, 5, NULL, 2),
(51, 'salida', 1318, '2024-03-17', 2, 2, NULL, 2),
(52, 'entrada', 45, '2024-03-17', 2, 3, 3, NULL),
(53, 'salida', 222, '2024-03-17', 41, 30, NULL, 2),
(54, 'salida', 101, '2024-03-17', 2, 4, NULL, 2),
(55, 'salida', 0, '2024-03-17', 2, 5, NULL, 2),
(56, 'salida', 20, '2024-03-17', 41, 39, NULL, 3),
(57, 'salida', 0, '2024-03-17', 2, 2, NULL, 1),
(58, 'salida', 0, '2024-03-17', 1, 21, NULL, 2),
(61, 'salida', 45, '2024-03-17', 2, 3, NULL, 2),
(62, 'salida', 100, '2024-03-17', 42, 2, NULL, 1),
(63, 'salida', 0, '2024-03-17', 41, 21, NULL, 2),
(64, 'salida', 26000, '2024-03-17', 41, 18, NULL, 2),
(65, 'salida', 222, '2024-03-17', 2, 35, NULL, 2),
(66, 'salida', 2000, '2024-03-17', 41, 1, NULL, 1),
(67, 'salida', 0, '2024-03-17', 2, 3, NULL, 1),
(68, 'salida', 0, '2024-03-17', 2, 2, NULL, 2),
(69, 'salida', 20, '2024-03-17', 2, 3, NULL, 2),
(70, 'salida', 45, '2024-03-17', 41, 1, NULL, 2),
(71, 'salida', 0, '2024-03-17', 2, 5, NULL, 2),
(72, 'salida', 45, '2024-03-17', 41, 1, NULL, 2),
(73, 'salida', 0, '2024-03-17', 41, 3, NULL, 2),
(74, 'salida', 0, '2024-03-17', 2, 3, NULL, 2),
(75, 'salida', 0, '2024-03-17', 2, 3, NULL, 1),
(76, 'salida', 0, '2024-03-17', 2, 3, NULL, 2),
(77, 'salida', 49, '2024-03-17', 41, 19, NULL, 2),
(78, 'salida', 45, '2024-03-17', 2, 1, NULL, 1),
(79, 'salida', 45, '2024-03-17', 41, 1, NULL, 1),
(80, 'salida', 45, '2024-03-17', 2, 1, NULL, 2),
(81, 'salida', 0, '2024-03-17', 2, 5, NULL, 2),
(82, 'salida', 45, '2024-03-17', 41, 1, NULL, 2),
(84, 'salida', 45, '2024-03-17', 41, 1, NULL, 2),
(85, 'salida', 45, '2024-03-17', 2, 1, NULL, 2),
(86, 'salida', 0, '2024-03-17', 2, 3, NULL, 2),
(87, 'salida', 10, '2024-03-17', 2, 12, NULL, 2),
(88, 'salida', 0, '2024-03-17', 41, 1, NULL, 2),
(89, 'salida', 20, '2024-03-17', 2, 1, NULL, 2),
(90, 'salida', 20, '2024-03-17', 41, 37, NULL, 2),
(91, 'salida', 20, '2024-03-17', 41, 3, NULL, 1),
(92, 'salida', 20, '2024-03-17', 2, 3, NULL, 1),
(93, 'salida', 0, '2024-03-17', 2, 3, NULL, 2),
(94, 'salida', 0, '2024-03-17', 2, 3, NULL, 2),
(95, 'salida', 85, '2024-03-17', 2, 1, NULL, 1),
(96, 'salida', 85, '2024-03-17', 41, 1, NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `residuos`
--

CREATE TABLE `residuos` (
  `id_residuo` int(11) NOT NULL,
  `nombre_residuo` varchar(50) DEFAULT NULL,
  `residuo` enum('no peligrosos','peligrosos') DEFAULT NULL,
  `tipo_residuo` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `unidad_medida` enum('kilogramo','gramo','litros','m3','m2','unidad') DEFAULT NULL,
  `fk_alm` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `residuos`
--

INSERT INTO `residuos` (`id_residuo`, `nombre_residuo`, `residuo`, `tipo_residuo`, `cantidad`, `unidad_medida`, `fk_alm`) VALUES
(1, 'carton', 'no peligrosos', 2, 0, 'm2', 3),
(2, 'papel', 'peligrosos', 2, 0, 'gramo', 2),
(3, 'medida', 'peligrosos', 4, 0, 'unidad', 2),
(4, 'minu', 'no peligrosos', 4, 0, 'litros', 3),
(5, 'prueba', 'no peligrosos', 3, 0, 'litros', 2),
(12, 'residuo 1', 'no peligrosos', 1, 0, 'kilogramo', 5),
(13, 'residuo 1.2', 'no peligrosos', 1, 12, 'kilogramo', 5),
(15, 'residuo 56', 'no peligrosos', 1, 26, 'kilogramo', 5),
(16, 'residuo idiididi', 'no peligrosos', 1, 26, 'kilogramo', 5),
(18, 'residuo alm 18', 'peligrosos', 3, 0, 'gramo', 4),
(19, 'residuo alm 1', 'no peligrosos', 1, 49, 'kilogramo', 5),
(20, 'residuo actividad', 'no peligrosos', 1, 4, 'kilogramo', 5),
(21, 'residuo actividad 2', 'no peligrosos', 1, 0, 'kilogramo', 5),
(22, 'express validator', 'peligrosos', 2, 20, '', 1),
(30, 'express validator 222', 'peligrosos', 2, 0, 'm3', 2),
(31, 'express  222', 'peligrosos', 2, 222, 'm3', 2),
(32, 'express  222', 'peligrosos', 2, 222, 'm3', 2),
(33, '211323', 'peligrosos', 2, 222, 'm3', 2),
(34, '211323', 'peligrosos', 2, 222, 'm3', 2),
(35, '1111111111111111', 'peligrosos', 2, 0, 'm3', 2),
(36, '111', 'peligrosos', 5, 1000, 'litros', 2),
(37, 'p registro', 'peligrosos', 5, 0, 'litros', 2),
(38, 'Prueba FRONTENDaaaa', 'peligrosos', 1, 10, 'litros', 5),
(39, '3333333333333333333333333', 'peligrosos', 1, 0, 'm2', 6),
(41, 'hola123', 'peligrosos', 2, 20, 'gramo', 2),
(42, 'nuevo', 'no peligrosos', 3, 0, 'litros', 5),
(47, 'ccccccccccccc', 'no peligrosos', 1, 45, 'kilogramo', 1),
(48, '77', 'no peligrosos', 1, 56, 'gramo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id_tipo` int(11) NOT NULL,
  `tipo_residuo` varchar(50) NOT NULL,
  `tipo` enum('no peligroso','peligroso') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id_tipo`, `tipo_residuo`, `tipo`) VALUES
(1, 'aprovechables', 'no peligroso'),
(2, 'aprovechables organicos', 'no peligroso'),
(3, 'no aprovechables', 'no peligroso'),
(4, 'especiales', 'no peligroso'),
(5, 'riesgo biologico', 'peligroso'),
(6, 'riesgo quimico', 'peligroso'),
(7, 'radiactivo', 'peligroso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `identificacion` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('administrador','pasante','operario') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `identificacion`, `email`, `password`, `rol`, `estado`) VALUES
(1, 'miller efren', 'rivera', '1007750963', 'miller@gmail.com', '123', 'administrador', 'activo'),
(2, 'efren', 'bermeo', '987654321', 'efren@gmail.com', '321', 'administrador', 'inactivo'),
(7, 'Juan', 'Perez', '123456789', 'juan.perez@example.com', 'contraseña1', 'pasante', 'activo'),
(8, 'María', 'Gómez', '987654321', 'maria.gomez@example.com', 'contraseña2', 'pasante', 'activo'),
(9, 'Carlos', 'Rodríguez', '456789123', 'carlos.rodriguez@example.com', 'contraseña3', 'pasante', 'activo'),
(10, 'Ana', 'Martínez', '789123456', 'ana.martinez@example.com', 'contraseña4', 'pasante', 'activo'),
(11, 'Pedro', 'López', '321654987', 'pedro.lopez@example.com', 'contraseña5', 'pasante', 'activo'),
(12, 'Laura', 'Sánchez', '654987321', 'laura.sanchez@example.com', 'contraseña6', 'pasante', 'activo'),
(13, 'Miguel', 'Fernández', '987321654', 'miguel.fernandez@example.com', 'contraseña7', 'pasante', 'activo'),
(14, 'Sofía', 'Díaz', '159263478', 'sofia.diaz@example.com', 'contraseña8', 'pasante', 'activo'),
(15, 'Jorge', 'Ruiz', '357159264', 'jorge.ruiz@example.com', 'contraseña9', 'pasante', 'activo'),
(16, 'Ana', 'García', '852963741', 'ana.garcia@example.com', 'contraseña10', 'pasante', 'activo'),
(17, 'David', 'Hernández', '741852963', 'david.hernandez@example.com', 'contraseña11', 'pasante', 'activo'),
(18, 'Elena', 'Jiménez', '369258147', 'elena.jimenez@example.com', 'contraseña12', 'pasante', 'activo'),
(19, 'Diego', 'Gutiérrez', '147258369', 'diego.gutierrez@example.com', 'contraseña13', 'pasante', 'activo'),
(20, 'Martina', 'Alvarez', '258369147', 'martina.alvarez@example.com', 'contraseña14', 'pasante', 'activo'),
(21, 'Luis', 'Romero', '369147258', 'luis.romero@example.com', 'contraseña15', 'pasante', 'activo'),
(22, 'Daniel', 'González', '123456780', 'daniel.gonzalez@example.com', 'contraseña16', 'pasante', 'activo'),
(23, 'Lucía', 'Santos', '987654322', 'lucia.santos@example.com', 'contraseña17', 'pasante', 'activo'),
(24, 'Roberto', 'Jiménez', '456789124', 'roberto.jimenez@example.com', 'contraseña18', 'pasante', 'activo'),
(25, 'Marina', 'Ruíz', '789123457', 'marina.ruiz@example.com', 'contraseña19', 'pasante', 'activo'),
(26, 'Alejandro', 'Martín', '321654988', 'alejandro.martin@example.com', 'contraseña20', 'pasante', 'activo'),
(27, 'Eva', 'Herrera', '654987322', 'eva.herrera@example.com', 'contraseña21', 'pasante', 'activo'),
(28, 'Natalia', 'López', '987321655', 'natalia.lopez@example.com', 'contraseña22', 'pasante', 'activo'),
(29, 'Hugo', 'Gómez', '159263479', 'hugo.gomez@example.com', 'contraseña23', 'pasante', 'activo'),
(30, 'Carolina', 'Díaz', '357159265', 'carolina.diaz@example.com', 'contraseña24', 'pasante', 'activo'),
(31, 'Marcos', 'Pérez', '852963742', 'marcos.perez@example.com', 'contraseña25', 'pasante', 'activo'),
(32, 'Andrea', 'Fernández', '741852964', 'andrea.fernandez@example.com', 'contraseña26', 'pasante', 'activo'),
(33, 'Pablo', 'García', '369258148', 'pablo.garcia@example.com', 'contraseña27', 'pasante', 'activo'),
(34, 'Sara', 'Martínez', '147258370', 'sara.martinez@example.com', 'contraseña28', 'pasante', 'activo'),
(35, 'Javier', 'Gutiérrez', '258369148', 'javier.gutierrez@example.com', 'contraseña29', 'pasante', 'activo'),
(36, 'Beatriz', 'Alonso', '369147259', 'beatriz.alonso@example.com', 'contraseña30', 'pasante', 'activo'),
(37, 'Manuel', 'López', '123456781', 'manuel.lopez@example.com', 'contraseña31', 'pasante', 'activo'),
(38, 'Nerea', 'Sánchez', '987654323', 'nerea.sanchez@example.com', 'contraseña32', 'pasante', 'activo'),
(39, 'Héctor', 'Ramírez', '456789125', 'hector.ramirez@example.com', 'contraseña33', 'pasante', 'activo'),
(40, 'Alicia', 'Hernández', '789123458', 'alicia.hernandez@example.com', 'contraseña34', 'pasante', 'activo'),
(41, 'Diego', 'Díaz', '321654989', 'diego.diaz@example.com', 'contraseña35', 'administrador', 'activo'),
(42, 'nuevo user', 'rivera', '1007750963', 'miller@gmail.com', '123', 'administrador', 'activo'),
(43, '111111111111111', '1111111111111', '111111111111', '11@gmail.com', '123', 'pasante', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_actividades`
--

CREATE TABLE `usuarios_actividades` (
  `id_relacion` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id_actividad`),
  ADD KEY `lugar_actividad` (`lugar_actividad`);

--
-- Indices de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  ADD PRIMARY KEY (`id_almacenamiento`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_lugar`);

--
-- Indices de la tabla `elementos`
--
ALTER TABLE `elementos`
  ADD PRIMARY KEY (`id_elemento`);

--
-- Indices de la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  ADD PRIMARY KEY (`id_elm_act`),
  ADD KEY `fk_elemento` (`fk_elemento`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- Indices de la tabla `empresas_recoleccion`
--
ALTER TABLE `empresas_recoleccion`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD PRIMARY KEY (`id_lugar`),
  ADD KEY `fk_area` (`fk_area`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `fk_residuo` (`fk_residuo`),
  ADD KEY `fk_elemento` (`usuario_adm`),
  ADD KEY `fk_actividad` (`fk_actividad`),
  ADD KEY `destino` (`destino`),
  ADD KEY `destino_2` (`destino`);

--
-- Indices de la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD PRIMARY KEY (`id_residuo`),
  ADD KEY `fk_alm` (`fk_alm`),
  ADD KEY `tipo_residuo` (`tipo_residuo`);

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  ADD PRIMARY KEY (`id_relacion`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_actividad` (`fk_actividad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id_actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `almacenamiento`
--
ALTER TABLE `almacenamiento`
  MODIFY `id_almacenamiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_lugar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `elementos`
--
ALTER TABLE `elementos`
  MODIFY `id_elemento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  MODIFY `id_elm_act` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas_recoleccion`
--
ALTER TABLE `empresas_recoleccion`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `lugares`
--
ALTER TABLE `lugares`
  MODIFY `id_lugar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `id_movimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `residuos`
--
ALTER TABLE `residuos`
  MODIFY `id_residuo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  MODIFY `id_relacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `actividades_ibfk_2` FOREIGN KEY (`lugar_actividad`) REFERENCES `areas` (`id_lugar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `elementos_actividades`
--
ALTER TABLE `elementos_actividades`
  ADD CONSTRAINT `elementos_actividades_ibfk_1` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `realiza` FOREIGN KEY (`fk_elemento`) REFERENCES `elementos` (`id_elemento`);

--
-- Filtros para la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD CONSTRAINT `lugares_ibfk_1` FOREIGN KEY (`fk_area`) REFERENCES `areas` (`id_lugar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`fk_residuo`) REFERENCES `residuos` (`id_residuo`),
  ADD CONSTRAINT `movimientos_ibfk_3` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimientos_ibfk_4` FOREIGN KEY (`usuario_adm`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimientos_ibfk_5` FOREIGN KEY (`destino`) REFERENCES `empresas_recoleccion` (`id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `residuos`
--
ALTER TABLE `residuos`
  ADD CONSTRAINT `residuos_ibfk_1` FOREIGN KEY (`fk_alm`) REFERENCES `almacenamiento` (`id_almacenamiento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `residuos_ibfk_2` FOREIGN KEY (`tipo_residuo`) REFERENCES `tipos` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_actividades`
--
ALTER TABLE `usuarios_actividades`
  ADD CONSTRAINT `usuarios_actividades_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_actividades_ibfk_2` FOREIGN KEY (`fk_actividad`) REFERENCES `actividades` (`id_actividad`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
