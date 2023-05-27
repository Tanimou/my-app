import Link from "next/link";
import Image from 'next/image'

import styles from "../../../styles/Home.module.css";

export const Header = () => (

< header className={styles.header}>
    {/* add a div block */}
    
        <div className="topNav">
            {/* import an image tag with width 50 and height 50 */}
            <Image src="/favicon.ico" width={50} height={50} alt="logo" />
            <nav className={styles.nav}>
                {/* add a ul tag and 3 li tag in it */}
                <ul>
                    <li>
                        <Link href="/"> Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/events">Events</Link>
                    </li>
                </ul>
            </nav>
        </div>

    
    </header>
    )