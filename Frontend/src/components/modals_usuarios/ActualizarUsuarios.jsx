import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axiosClient from '../../axios-client';
import { EditIcon } from '../icons/EditIcon';
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@nextui-org/autocomplete";

function ActualizarUsuarios({ fetchData, usuario }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        identificacion: "",
        email: "",
        rol: "",
        estado: "",
        password: ""
    });



    let id_usuario = usuario.id_usuario
    let nombre = usuario.nombre
    let apellidos = usuario.apellidos
    let identificacion = usuario.identificacion
    let email = usuario.email
    let rol = usuario.rol

    let estado = usuario.estado
    let password = usuario.password





    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(formData);
            alert("Datos actualizados correctamente");

            await axiosClient.put(`http://localhost:3000/usuario/editar/${id_usuario}`, formData).then((response) => {


                fetchData()
            })

            onOpenChange(false);
        } catch (error) {
            console.error('Error submitting data:', error);
            onOpenChange(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Button color="" className='w-10 text-blue-600' onPress={onOpen}>   <EditIcon /></Button>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Actualizar Usuario</ModalHeader>
                            <ModalBody>


                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Enter nombre"
                                    variant="bordered"
                                    name="nombre"
                                    defaultValue={nombre}
                                    value={formData.nombre || nombre}
                                    onChange={handleChange}
                                />


                                <Input
                                    autoFocus
                                    label="apellidos"
                                    placeholder="Enter apellidos"
                                    variant="bordered"
                                    name="apellidos"
                                    defaultValue={apellidos}
                                    value={formData.apellidos || apellidos}
                                    onChange={handleChange}
                                />

                                <Input

                                    label="identificacion"
                                    placeholder="Enter identificacion"
                                    variant="bordered"
                                    name="identificacion"
                                    defaultValue={identificacion}
                                    value={formData.identificacion || identificacion}
                                    onChange={handleChange}
                                />

                                <Input

                                    label="email"
                                    placeholder="Enter email"
                                    variant="bordered"
                                    name="email"
                                    defaultValue={email}
                                    value={formData.email || email}
                                    onChange={handleChange}
                                />

                                <Input

                                    label="rol"
                                    placeholder="Enter rol"
                                    variant="bordered"
                                    name="rol"
                                    defaultValue={rol}
                                    value={formData.rol || rol}
                                    onChange={handleChange}
                                />



                                <Input

                                    label="estado"
                                    placeholder="Enter estado"
                                    variant="bordered"
                                    name="estado"
                                    defaultValue={estado}
                                    value={formData.estado || estado}
                                    onChange={handleChange}
                                />

                                <Input

                                    label="password"
                                    placeholder="Enter password"
                                    variant="bordered"
                                    name="password"
                                    defaultValue={password}
                                    value={formData.password || password}
                                    onChange={handleChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Cerrar</Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>Actualizar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}



export default ActualizarUsuarios