import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CatEvent = ({data,pageName}) => {
  return (
      <div className='cat_events'>
          <h1>Events in {pageName}</h1>
          <div className='content'>
              {data.map((cat) => (
                  <Link className="card" key={cat.id} href={`/events/${cat.city}/${cat.id}`} passHref>


                      <Image width={200} height={100} alt={cat.title} src={cat.image} />
                      <h2>{cat.title}</h2>
                      <p>{cat.description}</p>

                  </Link>
              ))}
          </div>
      </div>
  )
}

export default CatEvent
