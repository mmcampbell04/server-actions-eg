import React from "react";
import { DeleteForm } from "./delete-form";
import { QueryResultRow } from "@vercel/postgres";

interface Props {
  url: QueryResultRow;
}

export const Card = ({ url }: Props) => {
  const decodedURL = decodeURIComponent(url.long);

  return (
    <li>
      <div>
        <strong>{`https://sniply/${url.short}`}</strong>
        <p>{decodedURL}</p>
      </div>
      <DeleteForm id={url.id} long={url.long} />
    </li>
  );
};
