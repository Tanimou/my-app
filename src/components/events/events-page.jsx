import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const EventsPage = ({data}) => {
return (
<div className='events'>
    {/* <h1>Events Page</h1> */}

    {/* create 3 div */}
    {data.map((cat) => (
    <Link className='card' key={cat.id} href={`/events/${cat.id}`} passHref>
    
        <Image width={300} height={300} alt={cat.title} src={cat.image} />
        <h2>{cat.title}</h2>
        {/* <p>{cat.description}</p> */}
    

    </Link>
    ))}
</div>
)
}

export default EventsPage