import { apiGet } from "@/lib/api.server";
import type { Stats } from "@/lib/types";
export default async function Dash() {
  const r = await apiGet<Stats>("/api/admin/stats"); const d = r.data;
  const s: [string, number | string][] = [["Total products", d?.products ?? "-"], ["Published products", d?.published ?? "-"], ["Total inquiries", d?.inquiries ?? "-"], ["Pending inquiries", d?.pending ?? "-"]];
  return (<><h1 className="font-display text-3xl text-forest">Dashboard</h1>{!r.ok && <p role="alert" className="mt-4 text-red-800">Could not load figures.</p>}
    <dl className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">{s.map(([l, n]) => <div key={l} className="bg-white border border-sand p-5"><dt className="text-sm text-soil">{l}</dt><dd className="font-display text-3xl mt-1">{n}</dd></div>)}</dl></>);
}
