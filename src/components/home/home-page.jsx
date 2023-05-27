import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";

export const HomePage = ({ data })=>  {
    return (
        <div className="home_body">
            {/* create 3 div */}

            {data?.map((cat) => (
                <Link className="card" key={cat.id} href={`/events/${cat.id}`} passHref>
                    <div  className="image"  >
                        <Image width={600} height={400} alt={cat.title} src={cat.image} />
                    </div>
                    <div className="content">
                        <h2>{cat.title}</h2>
                    <p>{cat.description}</p>
                    </div>
                    
                </Link>
            ))}
        </div>
    );
};
