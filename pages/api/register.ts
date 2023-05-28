import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

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
};

type Data = {
  events_categories: EventCat;
  allEvents: AllEvents;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { eventId } = req.body as { eventId: string };
    const { email } = req.body as { email: string };
    const method=req.method;
    
    // Get the path to the data.json file
    const dataPath = path.join(process.cwd(), 'data', 'data.json');
    
    // Read the data from the data.json file
    const data: Data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const { allEvents } = data;
    if (!allEvents) {
        res.status(404).json({ message: "Event not found" });
    }

    // Find the event with the specified ID
let eventIndex = -1;
    for (let i = 0; i < data.allEvents.length; i++) {
        if (data.allEvents[i].id === eventId) {
            eventIndex = i;
            break;
        }
    }

    // If we didn't find the event, return
    if (eventIndex === -1) {
        res.status(404).json({ message: "Event not found" });
    }
    // If the event is found, update the email address for the event
    if (eventIndex !== -1 && method==="POST") {
        data.allEvents[eventIndex].emails_registered.push(email);

        // Write the updated data back to the data.json file
        fs.writeFileSync(dataPath, JSON.stringify(data));

        res.status(200).json({ message: `Registration successful in ${eventId} for the user ${email}` });
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
}