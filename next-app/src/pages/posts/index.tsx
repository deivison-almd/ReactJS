import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Head from 'next/head';
import styles from './style.module.scss';

export default function NovaPartida() {
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
			<div className={styles.jogador1}>
			<label className={styles.label1} htmlFor="jodador">Jogador 1</label><br />
				<select className={styles.select1} name="jogador" id="jogador">
					<option value="player" disabled selected>selecionar</option>
					<option value="player1">Dany</option>
					<option value="player1">Dennis</option>
					<option value="player1">Waidiney</option>
					<option value="player1">Yuri</option>
					<option value="player1">Ygor</option>
					<option value="player1">Zaely</option>
				</select>
			</div>
			<div className={styles.jogador2}>
			<label className={styles.label2} htmlFor="jodador">Jogador 2</label><br />
				<select className={styles.select2} name="jogador" id="jogador">
					<option value="player" disabled selected>selecionar</option>
					<option value="2">Dany</option>
					<option value="2">Dennis</option>
					<option value="2">Waidiney</option>
					<option value="2">Yuri</option>
					<option value="2">Ygor</option>
				</select>
			</div>
				
			
			
			
			
				
			
        </div>
      </section>
    </main>
      </Layout>
    </>
  )
}