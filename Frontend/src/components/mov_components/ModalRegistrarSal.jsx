import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, Select, SelectItem, Input, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from '../PlusIcon';
import axiosClient from '../../axios-client';



<<<<<<< HEAD
function ModalRegistrarSal({fetchData}) {
=======
function ModalRegistrarSal() {
>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        id_residuo: "",
<<<<<<< HEAD
        usuario_adm: "",
        destino: ""
=======
        destino: "",
        usuario_adm: ""
>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
    });

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar_admin');
                setData(response.data);
                console.log("admin", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar');
                setData2(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData2();
    }, []);

    useEffect(() => {
        const fetchData3 = async () => {
            try {
                const response = await axiosClient.get('http://localhost:3000/residuo/listar_empresas');
                setData3(response.data);
                console.log("dataaa AAAA", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData3();
    }, []);



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            // Aquí puedes enviar los datos a tu backend utilizando axios o fetch
            console.log(formData);
<<<<<<< HEAD
=======


>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
            await axiosClient.post('http://localhost:3000/residuo/registrarsalida', formData).then((response) => {
                if (response.status == 200) {
                    alert(response.data)
                } else {
                    alert(response.data)
                }
<<<<<<< HEAD

                fetchData()
=======
>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
            })
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="flex flex-col gap-2">
<<<<<<< HEAD
            <Button color="default" endContent={<PlusIcon />} onPress={onOpen}>Registrar Salida</Button>
=======
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>Salida</Button>
>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
<<<<<<< HEAD
                                Registrar Movimiento
                            </ModalHeader>
                            <ModalBody>
=======
                                Registrar Salida Residuo
                            </ModalHeader>
                            <ModalBody>

>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
                                <Select
                                    autoFocus
                                    label="Residuo"
                                    placeholder="Selecciona un Residuo"
                                    name="id_residuo"
                                    value={formData.id_residuo}
                                    onChange={handleChange}
                                >
<<<<<<< HEAD
=======

                                    <SelectItem>
                                        Seleccionar Residuo
                                    </SelectItem>

>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
                                    {data2.map((item, index) => (
                                        <SelectItem key={item.id_residuo} value={item.id_residuo}>
                                            {item.nombre_residuo}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Adminstrador"
                                    placeholder="Selecciona un Encargado"
                                    name="usuario_adm"
                                    value={formData.usuario_adm}
                                    onChange={handleChange}
                                >
<<<<<<< HEAD
=======

                                    <SelectItem>
                                        Seleccionar un admistrador
                                    </SelectItem>


>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
                                    {data.map((item, index) => (
                                        <SelectItem key={item.id_usuario} value={item.id_usuario}>
                                            {item.nombre}
                                        </SelectItem>
                                    ))}
                                </Select>


                                <Select
                                    label="destino"
<<<<<<< HEAD
                                    placeholder="Selecciona una Empresa"
                                    name="destino"
                                    value={formData.destino}
                                    onChange={handleChange}
                                >
=======
                                    placeholder="Selecciona una empresa"
                                    name="destino" // Cambiar de 'id_actividad' a 'fk_actividad'
                                    value={formData.destino}
                                    onChange={handleChange}
                                >

                                    <SelectItem>
                                        Seleccionar una actividad
                                    </SelectItem>



>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
                                    {data3.map((item, index) => (
                                        <SelectItem key={item.id_empresa} value={item.id_empresa}>
                                            {item.nombre_empresa}
                                        </SelectItem>
                                    ))}
                                </Select>
<<<<<<< HEAD
                                                              
                                {/* <Input
                                    label="cantidad"
                                    placeholder="Enter cantidad"
                                    variant="bordered"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                /> */}



=======



            


>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea


                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onClick={handleSubmit} onPress={onClose}>
                                    Registrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

<<<<<<< HEAD


export default ModalRegistrarSal
=======
export default ModalRegistrarSal
>>>>>>> 7be9fc0b3581f6b2b226a9fe80bd071d9489f8ea
