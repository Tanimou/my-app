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
  const {method} = req;

  const client = await db.connect();

  //get all data from data table data6
  const data = await client.sql`
    SELECT * FROM data;
  `;

  const { rows } = data;

  // Convert QueryResultRow[] to Event[]
  const events: Event[] = rows.map((row: any) => ({
    id: row.id,
    title: row.title,
    city: row.city,
    description: row.description,
    image: row.image,
    emails_registered: row.emails_registered,
  }));
console.log(events);
  if (method === "POST") {
    const { eventId } = req.body as { eventId: string };
    const { email } = req.body as { email: string };
    // check in events if the id  == eventId
    //if yes, add the email to the emails_registered array
    //and update the data table
    //if no, return a 404 error
    const event = events.find((event: Event) => event.id === eventId);
    console.log(event);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    if (event.emails_registered.includes(email)) {
      res.status(404).json({ message: "Email already registered for this event" });
      return;
    }

    event.emails_registered.push(email);
    await client.query(
      `UPDATE data SET emails_registered = $1 WHERE id = $2`,
      [event.emails_registered, eventId]
    );
    
  
    res.status(200).json({
      message: `Registration successful in ${eventId} for the user ${email}`,
    });
  } else {
    // If the request method is not POST, return a 404 error
    res.status(404).json({ message: "Event not found" });
  }
}
