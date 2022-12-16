import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";

export const HomePage = ({ data })=>  {
    return (
        <main className={styles.main}>
            {/* create 3 div */}

            {data?.map((cat) => (
                <Link key={cat.id} href={`/events/${cat.id}`} passHref>
                    <Image width={200} height={"100"} alt={cat.title} src={cat.image} />
                    <h2>{cat.title}</h2>
                    <p>{cat.description}</p>
                </Link>
            ))}
        </main>
    );
};
