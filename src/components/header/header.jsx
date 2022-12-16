import Link from "next/link";

import styles from "../../../styles/Home.module.css";
export const Header = () => (

    < header className={styles.header} >

        < nav className={styles.nav} >

            <Link Link href="/" > Home</Link>

            <Link href="/about">About</Link>

            <Link href="/events">Events</Link>

        </nav >
    </header >
)