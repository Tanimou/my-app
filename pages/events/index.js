import Image from 'next/image'
import Link from 'next/link'
import EventsPage from 'src/components/events/events-page'

export default function event1({ data }) {
  return <EventsPage data={data} />
  
}


export async function getStaticProps() {
  const { events_categories } = await import('data/data.json');
  return {
    props: {
      data: events_categories,
    },
  };
}