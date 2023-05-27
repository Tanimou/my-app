
import Image from "next/image";

export default function singleeventpage({data}) {
  return (
    <div>
      <div>
        {/* create 3 div */}
      
            <Image width={1000} height={500} alt={data.title} src={data.image} />
            <h2>{data.title}</h2>
            <p>{data.description}</p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const {allEvents} = await import('/data/data.json')
  
  const allPaths = allEvents.map(path => {
    return {
      params: {
        cat:path.city,
        id: path.id
      }
    }
  })
  return {
    paths: allPaths,
    fallback:false
}
}

export async function getStaticProps(context) {
  const { allEvents } = await import('data/data.json')
  const id = context.params.id
  const eventData=allEvents.find(ev=>id===ev.id)
  return {
    props:{data:eventData}
  }
}