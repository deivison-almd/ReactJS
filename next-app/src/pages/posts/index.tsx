import { Col, Layout, Row, Select } from 'antd';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api';

import styles from './style.module.scss';

import 'antd/dist/antd.css';

const { Option } = Select;

type Usuario = {
  id: number;
  nome: string;
  sexo: string;
};

export default function NovaPartida() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuario1, setUsuario1] = useState<Usuario>();
  const [usuario2, setUsuario2] = useState<Usuario>();

  const buscarUsuarios = useCallback(async () => {
    // setLoading(true);
    try {
      const response = await api.get(`/usuarios`);
      setUsuarios(response.data);
      console.log(usuarios);

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

  const selecionarUser1 = (item: any) => {
    setUsuario1(item);
    console.log('Jogador 1: ' + item);
  };
  const selecionarUser2 = (item: any) => {
    setUsuario2(item);

    console.log('Jogador 2: ' + item);
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>Nova Partida | Selecionar Jogador </title>
        </Head>
        <main className={styles.bodyContainer}>
          <section className={styles.bodySection}>
            <div className={styles.container}>
              <h1>Disputa</h1>
              {/* <div className={styles.jogador1}> */}
              <Row>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <label className={styles.label1} htmlFor="jodador">
                    Jogador 1
                  </label>
                  <br />
                  <Select
                    showSearch
                    placeholder="Jogador 1"
                    onSelect={(e: any) => {
                      selecionarUser1(e);
                    }}
                  >
                    {usuarios.map((item) => (
                      <Option key={item.id} value={item.nome}>
                        {item.nome}
                      </Option>
                    ))}
                  </Select>
                  {/* <select className={styles.select1} name="jogador" id="jogador">
                  <option value="player" disabled selected>
                    selecionar
                  </option>
                  <option value="player1">Dany</option>
                  <option value="player1">Dennis</option>
                  <option value="player1">Waidiney</option>
                  <option value="player1">Yuri</option>
                  <option value="player1">Ygor</option>
                  <option value="player1">Zaely</option>
                </select> */}
                </Col>
                {/* <div className={styles.jogador2}> */}
                <Col xs={24} sm={12} md={12} lg={12}>
                  <label className={styles.label2} htmlFor="jodador">
                    Jogador 2
                  </label>
                  <br />
                  <Select
                    showSearch
                    placeholder="Jogador 2"
                    onSelect={(e: any) => {
                      selecionarUser2(e);
                    }}
                  >
                    {usuarios.map((item) => (
                      <Option key={item.id} value={item.nome}>
                        {item.nome}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <br />
              <p>
                <>{usuario1}</>
              </p>
              <br />
              <h2>{usuario2?.nome}</h2>
              <h1>
                <button className={styles.buttonStart}>Start</button>
              </h1>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
