import { apiGet } from "@/lib/api.server";
import ActionButton from "@/components/ActionButton";
import type { Inquiry, InquiryStatus } from "@/lib/types";
const st: InquiryStatus[] = ["PENDING", "READ", "RESOLVED"];
export default async function Inq() {
  const r = await apiGet<Inquiry[]>("/api/admin/inquiries"); const list = r.data ?? [];
  return (<><h1 className="font-display text-3xl text-forest">Inquiries</h1>
    {!r.ok ? <p role="alert" className="mt-8 text-red-800">Could not load inquiries.</p> : list.length === 0 && <p className="mt-8 text-soil">No inquiries yet.</p>}
    <ul className="mt-6 grid gap-3">{list.map(q => (<li key={q.id} className="bg-white border border-sand"><details><summary className="p-4 cursor-pointer flex flex-wrap justify-between gap-2"><span><strong>{q.subject}</strong> from {q.name}</span><span className="text-sm text-soil">{q.status.toLowerCase()} | {new Date(q.createdAt).toLocaleDateString("en-GB")}</span></summary>
      <div className="px-4 pb-4 grid gap-3"><p className="whitespace-pre-line">{q.message}</p><p className="text-sm text-soil">{q.email} | {q.phone}</p>
        <div className="flex flex-wrap gap-4 text-sm">{st.map(s => <ActionButton key={s} url={`/api/admin/inquiries/${q.id}`} method="PATCH" body={{ status: s }} label={`Mark ${s.toLowerCase()}`} disabled={q.status === s} />)}
          <ActionButton url={`/api/admin/inquiries/${q.id}`} method="DELETE" label="Delete" danger confirmText="Delete this inquiry?" /></div></div></details></li>))}</ul></>);
}
