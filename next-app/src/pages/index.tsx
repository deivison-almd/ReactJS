import Head from 'next/head';
import styles from './home.module.scss';

export default function Home() {
  return (
   <>
    <Head>
      <title> Inicio | Pipoca Pong</title>
    </Head>
 
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>🏓 Hello, welcome to Ping Pong</span>
        <h1>O <span>Capote</span> Presente Até na Web.</h1>
        <p>
          Estagiário não perde, só prefere não ganhar <br />
          <span>porque seria muita humilhação.</span>
        </p>
      </section>

      <img className={styles.giphy} src="/images/ping-pong.gif" alt="giphy ping pong" />
    </main>
    </>
  )
}