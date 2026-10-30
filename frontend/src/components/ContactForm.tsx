"use client";
import { useRef, useState } from "react";
import { send } from "@/lib/api.client";
type S = { ok: boolean; message: string; errors?: Record<string, string[]> };
export default function ContactForm() {
  const opened = useRef(Date.now());
  const [s, setS] = useState<S>({ ok: false, message: "" });
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; setBusy(true);
    const r = await send("/api/inquiries", "POST", { ...Object.fromEntries(new FormData(form)), t: opened.current });
    setBusy(false);
    if (r.ok) { form.reset(); opened.current = Date.now(); setS({ ok: true, message: (r.data.message as string) ?? "Thank you. Your inquiry has been received." }); }
    else setS({ ok: false, message: r.error || "We could not send your inquiry. Please call or WhatsApp us instead.", errors: r.fields });
  }
  const f = (n: string, label: string, type = "text") => (
    <label className="block"><span className="text-sm text-soil">{label}</span>
      <input name={n} type={type} required className="mt-1 w-full border border-sand bg-white px-3 py-2" />
      {s.errors?.[n] && <span role="alert" className="text-sm text-red-800">{s.errors[n][0]}</span>}</label>);
  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {f("name", "Full name")}{f("email", "Email", "email")}{f("phone", "Phone", "tel")}{f("subject", "Subject")}
      <label className="block"><span className="text-sm text-soil">Message</span>
        <textarea name="message" rows={5} required className="mt-1 w-full border border-sand bg-white px-3 py-2" />
        {s.errors?.message && <span role="alert" className="text-sm text-red-800">{s.errors.message[0]}</span>}</label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={busy} className="bg-forest text-paper px-6 py-3 hover:bg-olive transition-colors disabled:opacity-60">{busy ? "Sending" : "Send inquiry"}</button>
      {s.message && <p role="status" className={s.ok ? "text-forest" : "text-red-800"}>{s.message}</p>}
    </form>);
}
