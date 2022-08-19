import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles  from './style.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img className={styles.logo} src="/images/logo.svg" alt="logo" /> 
        <h1 className={styles.titleLogo}>Pipoca Pong</h1>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/" >
            <a >Inicio</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a >Nova Partida</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/score">
            <a>Score</a>
          </ActiveLink>
        </nav>

        <SignInButton/>
      </div>
    </header>
  );
}