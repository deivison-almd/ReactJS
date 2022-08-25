import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { api } from '../../../services/api';

const ModalAtt = ({
  data,
  setData,
  dataEdit,
  setDataEdit,
  isOpen,
  changeOpenModalAtt,
  buscarUsuarios
}: {
  data: any;
  setData: any;
  dataEdit: any;
  setDataEdit: any;
  isOpen: any;
  changeOpenModalAtt: any;
  buscarUsuarios: any;
}) => {
  const [nome, setNome] = useState(dataEdit.nome || '');
  const [email, setEmail] = useState(dataEdit.email || '');

  // const handleSave = () => {
  //   atualizar(id, nome, email);

  //   if (!nome || !email) return;

  //   if (emailAlreadyExists()) {
  //     return alert('E-mail já cadastrado!');
  //   }

  //   if (Object.keys(dataEdit).length) {
  //     data[dataEdit.index] = { nome, email };
  //   }

  //   const newDataArray = !Object.keys(dataEdit).length
  //     ? [...(data ? data : []), { nome, email }]
  //     : [...(data ? data : [])];

  //   localStorage.setItem('cad_cliente', JSON.stringify(newDataArray));

  //   setData(newDataArray);

  //   onClose();
  // };

  const chamaAtualizar = () => {
    atualizar(dataEdit, nome, email);
  };

  const atualizar = useCallback(
    async (dataEdit: any, nome: any, email: any) => {
      try {
        await api.put(`/usuarios/${dataEdit.id}`, {
          // id: dataEdit.id,
          nome,
          email,
        });

        buscarUsuarios();

        changeOpenModalAtt();
      } catch (error) {
        console.log('erro ao salvar usuario');
        //   onNotification("error", {
        // 	message:
        // 	  "Erro! Provavelmente ouve uma falha na comunicação com o servido, tente novamente",
        // 	description:
        // 	  "Se persistir o erro, verifique a senha na lista de SENHAS NÃO ATENDIDAS",
        //   });
        //   setLoading(false);
      }
    },
    [],
  );

  const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item: { email: any }) => item.email === email);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={changeOpenModalAtt}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={chamaAtualizar}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={changeOpenModalAtt}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAtt;
