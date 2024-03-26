"use client";

import { useFormState, useFormStatus } from "react-dom";
import { shortenUrl } from "@/app/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Snip
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(shortenUrl, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="url">
        Enter Url
        {state.message.includes("must be") && <span>{state?.message}</span>}
      </label>
      <input type="text" id="url" name="url" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
