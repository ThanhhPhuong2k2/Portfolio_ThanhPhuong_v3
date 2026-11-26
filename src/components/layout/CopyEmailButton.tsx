"use client";

import { useEffect, useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  /** "Copy email": the button's name while idle */
  label: string;
  /** "Copied": said (aria-live) and shown once the address is on the clipboard */
  copiedLabel: string;
  /** "Couldn't copy": said and shown when the clipboard refuses (no permission, an old browser) */
  failedLabel: string;
}

type CopyState = "idle" | "copied" | "failed";

/** How long the result stays before the button goes back to idle. */
const RESET_MS = 2000;

/**
 * Copies the email address for visitors whose mail app does not open from a mailto link (webmail).
 * The one client leaf of the contact section: everything around it is server-rendered. The result
 * is said in a polite live region and shown on the button; it resets after two seconds.
 */
export function CopyEmailButton({ email, label, copiedLabel, failedLabel }: CopyEmailButtonProps) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), RESET_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  const message = state === "copied" ? copiedLabel : state === "failed" ? failedLabel : "";

  return (
    <>
      <button type="button" className="btn btn--secondary contact__copy" data-state={state} onClick={copy}>
        {message || label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
    </>
  );
}
