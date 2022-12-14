import Image from 'next/image'

export default function event1({ data }) {
  return (
    <div>
      <h1>Events Page</h1>
      <div>
        {/* create 3 div */}
        {data.map((cat) => (
          <a key={cat.id } href={`/events/${cat.id}`}>
            <Image width={200} height={'100'} alt={cat.title} src={cat.image} />
            <h2>{cat.title}</h2>
            <p>{cat.description}</p>
          </a>

        ))}
    
      </div>
    </div>
  );
}


export async function getStaticProps() {
  const { events_categories } = await import('data/data.json');
  return {
    props: {
      data: events_categories,
    },
  };
}