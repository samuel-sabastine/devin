"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";

const initialState: InquiryState = { status: "idle" };

const fieldClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export function ContactAgentForm({
  listingId,
  agentId,
  agentName,
  listingTitle,
}: {
  listingId: string;
  agentId: string;
  agentName: string;
  listingTitle: string;
}) {
  const [state, formAction] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="listingId" value={listingId} />
      <input type="hidden" name="agentId" value={agentId} />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          Name
        </label>
        <input id="name" name="name" required className={fieldClass} aria-describedby="name-error" />
        {state.errors?.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} aria-describedby="email-error" />
        {state.errors?.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
          Phone <span className="text-slate-400">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          defaultValue={`Hi ${agentName}, I'd like to schedule a tour of ${listingTitle}.`}
          className={fieldClass}
          aria-describedby="message-error"
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {state.errors.message}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <SubmitButton />
      <p className="text-xs text-slate-500">
        By sending this message you agree to be contacted about this property. Demo site — no data is shared.
      </p>
    </form>
  );
}
