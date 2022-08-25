import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import {
  Box,
  Flex,
  useDisclosure,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Table, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';
import ModalComp from './ModalCad/Modal';
import ModalAtt from './ModalCad/ModalAtt';
import Head from 'next/head';

interface Usuario {
  id: string;
  nome: string;
  sexo: string;
}

const Cadastro = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [isOpenAtt, setIsOpenAtt] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const changeOpenModalAtt = () => {
    setIsOpenAtt(!isOpenAtt);
  };

  // useEffect(() => {
  //   const db_costumer = localStorage.getItem('cad_cliente')
  //     ? JSON.parse(localStorage.getItem('cad_cliente')!)
  //     : [];

  //   setData(db_costumer);
  // }, [setData]);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const handleRemove = (email: any) => {
    const newArray = data.filter((item: any) => item.email !== email);

    setData(newArray);

    localStorage.setItem('cad_cliente', JSON.stringify(newArray));
  };

  const columns: ColumnsType<Usuario> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Editar',
      dataIndex: '',
      key: 'editar',
      render: (record) => (
        <Button
          type="primary"
          onClick={() => {
            setDataEdit(record), changeOpenModalAtt();
          }}
        >
          Editar
        </Button>
      ),
    },
    {
      title: 'Deletar',
      dataIndex: '',
      key: 'deletar',
      render: (record) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            deletaUsuario(record);
          }}
        >
          Deletar
        </Button>
      ),
    },
  ];

  const buscarUsuarios = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/usuarios`);
      setUsuarios(response.data);

      //   setLoading(false);
    } catch (error) {
      console.log('erro ao buscar usuarios');
      //   onNotification("error", {
      // 	message:
      // 	  "Erro! Provavelmente ouve uma falha na comunicação com o servido, tente novamente",
      // 	description:
      // 	  "Se persistir o erro, verifique a senha na lista de SENHAS NÃO ATENDIDAS",
      //   });
      //   setLoading(false);
    }
  }, []);

  const deletaUsuario = useCallback(async (record: any) => {
    // setLoading(true);

    console.log(record.id);

    try {
      const response = await api.delete(`/usuarios/${record.id}`);
      buscarUsuarios();

      //   setLoading(false);
    } catch (error) {
      console.log('erro ao buscar usuarios');
      //   onNotification("error", {
      // 	message:
      // 	  "Erro! Provavelmente ouve uma falha na comunicação com o servido, tente novamente",
      // 	description:
      // 	  "Se persistir o erro, verifique a senha na lista de SENHAS NÃO ATENDIDAS",
      //   });
      //   setLoading(false);
    }
  }, []);

  return (
    <>
    <Head><title>Cadastro | Usuários</title></Head>
      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
      >
        <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
          <Button onClick={() => [setDataEdit({}), onOpen()]}>
            NOVO CADASTRO
          </Button>

          <Box overflowY="auto" height="100%">
            <Table dataSource={usuarios} columns={columns} />
          </Box>
        </Box>
        {isOpen && (
          <ModalComp
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )}
        {isOpenAtt && (
          <ModalAtt
            isOpen={isOpenAtt}
            changeOpenModalAtt={changeOpenModalAtt}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
            buscarUsuarios={buscarUsuarios}
          />
        )}
      </Flex>
    </>
  );
};

export default Cadastro;
