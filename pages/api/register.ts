import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@vercel/postgres";

// Define the types for the data in the JSON file
type EventCat = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type Event = {
  id: string;
  title: string;
  city: string;
  description: string;
  image: string;
  emails_registered: string[];
};

type AllEvents = {
  length: number;
  [index: number]: Event;
  map: (
    callbackfn: (value: Event, index: number, array: Event[]) => unknown,
    thisArg?: any
  ) => AllEvents;
};

type Data = {
  events_categories: EventCat;
  allEvents: AllEvents;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  const client = await db.connect();

  //get all data from data table data6
  const data = client.sql`
    SELECT * FROM data6;
  `;
  console.log(`${data}`);

  if (method === "POST") {
    const { eventId } = req.body as { eventId: string };
    const { email } = req.body as { email: string };
    // const newAllEvents = data.foreach((event: Event) => {
    //   if (event.id === eventId) {
    //     if (event.emails_registered.includes(email)) {
    //       // If the user has already registered for the event, return a 409 error
    //       res.status(409).json({
    //         message: `User ${email} already registered in ${eventId}`,
    //       });
    //       return event;
    //     }
    //     // Add the user's email to the 'emails_registered' array for the event
    //     return {
    //       ...event,
    //       emails_registered: [...event.emails_registered, email],
    //     };
    //   }
    //   return event;
    // }) as AllEvents;
    // Update the 'allEvents' array in the JSON file with the new data
    // data.allEvents = newAllEvents;
    // fs.writeFileSync(dataPath, JSON.stringify(data));
    // Return a success message
    res.status(200).json({
      message: `Registration successful in ${eventId} for the user ${email}`,
    });
  } else {
    // If the request method is not POST, return a 404 error
    res.status(404).json({ message: "Event not found" });
  }
}
