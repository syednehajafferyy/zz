import Link from "next/link";
import { redirect } from "next/navigation";
import { apiGet } from "@/lib/api.server";
import SignOutButton from "@/components/SignOutButton";
export const dynamic = "force-dynamic";
export default async function Panel({ children }: { children: React.ReactNode }) {
  const me = await apiGet<{ ok: boolean }>("/api/auth/me");
  if (me.status === 401) redirect("/admin/login");
  return (<div className="min-h-screen"><header className="border-b border-sand bg-white px-4 md:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
    <span className="font-display text-forest">Admin</span>
    <nav className="flex flex-wrap gap-4 text-sm flex-1" aria-label="Admin">{["dashboard", "products", "categories", "inquiries"].map(s => <Link key={s} href={`/admin/${s}`} className="navlink capitalize">{s}</Link>)}</nav>
    <SignOutButton /></header>
    <div className="p-4 md:p-8 max-w-5xl">{!me.ok && <p role="alert" className="mb-4 text-red-800">The server could not be reached. Changes may not save.</p>}{children}</div></div>);
}
