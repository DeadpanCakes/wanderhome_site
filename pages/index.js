import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wanderhome</title>
        <meta name="description" content="Web app for the tabletop role-playing game Wanderhome by Jay Dragon" />
        <meta keywords="Tabletop Role-Playing, TTRPG, Wanderhome" />
        <meta name="author" content="Anthony Mendoza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <h2>Body</h2>
      </main>
      <footer>
        <h3>Footer</h3>
      </footer>
    </div>
  )
}
