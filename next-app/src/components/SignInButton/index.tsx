import styles  from './styles.module.scss'
import { FaTableTennis }  from 'react-icons/fa'

export function SignInButton() {
    return (
        <button className={styles.buttonCadastro} type="button">
            <FaTableTennis/>
            <span>Cadastre-se agora</span>
        </button>
    )
} 