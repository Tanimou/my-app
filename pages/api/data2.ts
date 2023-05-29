import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
// how to install vercel cli with npm


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

export default async function handler(
  _request: NextApiRequest,
  response: NextApiResponse
) {

  const client = await db.connect();
  // response.status(200).json({ message: "Connected to the database" });
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS data (
        id TEXT NOT NULL,
        city TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        emails_registered TEXT[]
    
      );
    `;
    // response.status(200).json({ message: "Table created successfully" });
    // download allEvents of data.json content to the data table
    const dataPath = path.join(process.cwd(), "data", "data.json");

    // Read the data from the data.json file
    const data: Data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const { allEvents } = data;
    allEvents.map(async (event) => {
      const values = [event.id, event.city, event.title, event.description, event.image, event.emails_registered]
      await client.query(
        "INSERT INTO data (id, city, title, description, image, emails_registered) VALUES ($1, $2, $3, $4, $5, $6)",
        values
      );
      const data2 = await client.sql`
select * from data;
    `;

console.log(data2)
      response.status(200).json({ data2 });
    })
  }

   catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  } finally {
    client.release();
  }
}
