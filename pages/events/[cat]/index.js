import Image from 'next/image'
import CatEvent from 'src/components/events/CatEvent'
// import Link
import Link from 'next/link'

const eventcatpage = ({ data, pageName }) => <CatEvent data={data} pageName={ pageName} />
export default eventcatpage

export async function getStaticPaths() {
  const { events_categories } = await import('data/data.json');
  const allPaths = events_categories.map((ev) =>
  {
    return {
        params: { cat: ev.id.toString() },
      
    }
  }) 
  
  return {
    paths: allPaths,
    //nextjs will try to generate the page if it is not found in the paths array
    //if fallback is false, nextjs will return a 404 page
    //if fallback is true, nextjs will generate the page on the fly
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context)
  const id=context?.params.cat
  const { allEvents } = await import('data/data.json');
  //filter allEvents to return only events that city is equal to the id of the context and store it in a variable called data
  const data = allEvents.filter((ev) => ev.city === id);
  return {
    props: {
      //instead of data:data, we can juste say data
      data,
      pageName:id
    },
  };
}