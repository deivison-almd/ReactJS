import styles from './styles.module.scss';
import { FaTableTennis } from 'react-icons/fa';
import Link from 'next/link';

export function SignInButton() {
  return (
    <Link href="/cadastro">
      <button className={styles.buttonCadastro} type="button">
        <FaTableTennis />
        <span>Cadastre-se agora</span>
      </button>
    </Link>
  );
}
