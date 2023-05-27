import React from 'react'

import Image from 'next/image';
const SingleEvent = ({data}) => {
return (
<div>
    <div>
        {/* create 3 div */}

        <Image width={1000} height={500} alt={data.title} src={data.image} />
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        {/* add an input */}
        <input className="input" type="email" placeholder="Enter your email" />
        {/* add also a button */}
        <button className="submitButton">Submit</button>
    </div>
</div>
)
}

export default SingleEvent