import React from 'react'
import {Header} from '../header/header'
import {Footer} from '../footer/footer'
 export default function MainLayout ({children})  {
    return (
        <>
            <Header />
{/* we are destructuring the props to get children parameter
    That means we can put everything we want between the header and the footer
    And we are going to call this component in our _app.tsx folder that the main component */}
            {children}

            <Footer />
        </>
    )
}