import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({data}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* add a header */}
      <header className={styles.header}>
        {/* add a navigation */}
        <nav className={styles.nav}>
          {/* add also an image tag */}
        
          
              <Link href="/">Home</Link>
            
              <Link href="/about">About</Link>
          
              <Link href="/events">Events</Link>
        
        </nav>
      </header>
      <main className={styles.main}>
        {/* create 3 div */}
    
        {data.map((cat) => (
          <Link key={cat.id} href={`/events/${cat.id}`} passHref>
              
              <Image width={200} height={'100'} alt={cat.title} src={cat.image} />
              <h2>{cat.title}</h2>
              <p>{ cat.description}</p>
            
            </Link>
          
          
          ))}
      </main>

      <footer className={styles.footer}>
        {/* add a copyrigth */}
        <p>&copy; 2021 Events Next App</p>
        
      </footer>
    </div>
  )
}


//SERVER SIDE RENDERING
// This function returns the props object which is passed to the component as props
// This function is only executed on the server side.
export async function getServerSideProps() {

  //data is our internal database
  const {events_categories} = await import('data/data.json')

  return {
    props: {
  data: events_categories,
    },
  };
}

