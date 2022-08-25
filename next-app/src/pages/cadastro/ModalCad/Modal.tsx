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

const ModalComp = ({
  data,
  setData,
  dataEdit,
  setDataEdit,
  isOpen,
  onClose,
}: {
  data: any;
  setData: any;
  dataEdit: any;
  setDataEdit: any;
  isOpen: any;
  onClose: any;
}) => {
  const [nome, setNome] = useState(dataEdit.nome || '');
  const [email, setEmail] = useState(dataEdit.email || '');

  // const handleSave = () => {
  //   if (!name || !email) return;

  //   if (emailAlreadyExists()) {
  //     return alert('E-mail já cadastrado!');
  //   }

  //   if (Object.keys(dataEdit).length) {
  //     data[dataEdit.index] = { name, email };
  //   }

  //   const newDataArray = !Object.keys(dataEdit).length
  //     ? [...(data ? data : []), { name, email }]
  //     : [...(data ? data : [])];

  //   localStorage.setItem('cad_cliente', JSON.stringify(newDataArray));

  //   setData(newDataArray);

  //   onClose();
  // };

  const handleSave = () => {
    save(nome, email);

    if (!nome || !email) return;

    if (emailAlreadyExists()) {
      return alert('E-mail já cadastrado!');
    }

    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { nome, email };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { nome, email }]
      : [...(data ? data : [])];

    localStorage.setItem('cad_cliente', JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  const save = useCallback(async (nome: any, email: any) => {
    // setLoading(true);
    try {
      const response = await api.post(`/usuarios`, {
        nome,
        email,
      });

      onClose();

      //   setLoading(false);
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
  }, []);

  const atualizar = useCallback(async (id: any, nome: any, email: any) => {
    // setLoading(true);
    try {
      const response = await api.put(`/usuarios`, {
        id,
        nome,
        email,
      });

      onClose();

      //   setLoading(false);
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
  }, []);

  const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item: { email: any }) => item.email === email);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Jogadores</ModalHeader>
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
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
