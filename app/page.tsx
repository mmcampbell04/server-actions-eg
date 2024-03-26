import { AddForm } from "@/app/add-form";
import { sql } from "@vercel/postgres";
import { Card } from "./Card";

export default async function Home() {
  let data = await sql`SELECT * FROM link`;
  const { rows: urls } = data;

  return (
    <main>
      <h1 className="sr-only">Url Shortener</h1>
      <AddForm />
      <ul>
        {urls.map((url) => (
          <Card key={url.id} url={url} />
        ))}
      </ul>
    </main>
  );
}
