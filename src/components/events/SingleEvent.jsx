import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Confetti from "react-confetti";
import SuccessMessage from "../success/SuccessMessage";

const SingleEvent = ({ data }) => {
  // Create a reference to the email input field
  const emailInputRef = useRef();
  console.log(emailInputRef);

  // Get the router object from Next.js
  const router = useRouter();

  // Set up state to show/hide the success message and confetti
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Function to register the user for the event
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
        body: JSON.stringify({ email, eventId }),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      console.log("data", data);
      if (data) {
        // Show the success message and confetti
        setShowSuccessMessage(true);
        setConfetti(true);
        setTimeout(() => {
          // Hide the success message and confetti after 3 seconds
          setShowSuccessMessage(false);
          setConfetti(false);
        }, 3000);
        console.log("success");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="eventsinglepage">
      {/* Show the confetti if the 'confetti' state is true */}
      {confetti && (
        <div
          className="confetti-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
          }}
        >
          <Confetti
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
            run={confetti}
            tweenDuration={5000}
          />
        </div>
      )}
      <div>
        {/* Show the event title, image, and description */}
        <h2>{data.title}</h2>
        <Image width={1000} height={500} alt={data.title} src={data.image} />
        <p>{data.description}</p>
        {/* Show a form to register for the event */}
        <form onSubmit={registerUser} className="formControl">
          <label className="label">Get registered for this event</label>
          {/* Add an email input field */}
          <input
            ref={emailInputRef}
            className="input"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          {/* Add a submit button */}
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        {/* Show the success message if the 'showSuccessMessage' state is true */}
        {showSuccessMessage && (
          <SuccessMessage
            message="User successfully registered!"
            show={showSuccessMessage}
          />
        )}
      </div>
    </div>
  );
};

export default SingleEvent;
