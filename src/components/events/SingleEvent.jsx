import React, { useRef,useState} from 'react'
import { useRouter } from 'next/router';    
import Image from 'next/image';
import SuccessMessage from '../success/SuccessMessage';

const SingleEvent = ({ data }) => {

    const emailInputRef = useRef();
    console.log(emailInputRef)
    const router = useRouter();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    console.log(router)

    const registerUser = async (e) => {
        
        e.preventDefault();
        const eventId = router?.query.id;
        const email = emailInputRef.current.value;
        try {
        const response = await fetch("/api/register/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email,eventId}),
            });
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Failed to register user");
        }

        const data = await response.json();
            console.log("data", data);
            if (data) {
                    
                setShowSuccessMessage(true);
console.log("success")            }
        return data;
        } catch (error) {
        console.error(error);
        }
    };
    return (
      <div className="eventsinglepage">
        <div>
          {/* create 3 div */}

          <h2>{data.title}</h2>
          <Image width={1000} height={500} alt={data.title} src={data.image} />
          <p>{data.description}</p>
          <form onSubmit={registerUser} className="formControl">
            {/* add an input */}
            <label className="label">Get registered for this event</label>
            <input
              ref={emailInputRef}
              className="input"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            {/* add also a button */}
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
          {showSuccessMessage && (
            <SuccessMessage
              
               message="User successfully registered!"
            />
          )}
        </div>
      </div>
    );
}

export default SingleEvent