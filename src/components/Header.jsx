import styles from '../styles/header.module.css'

export default function Header() {
  return (<header className={styles.header}>
    <h1 className={styles.title}>Micro-Reddit</h1>
    <a href='https://www.github.com/lucadye/' className={styles.subtitle}>By Dyenamite</a>
  </header>)
}
