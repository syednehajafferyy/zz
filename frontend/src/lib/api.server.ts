import { cookies } from "next/headers";
const API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
/** Server-side GET to the backend, forwarding the visitor's cookies (for admin pages). */
export async function apiGet<T>(path: string): Promise<{ ok: boolean; status: number; data: T | null }> {
  try {
    const res = await fetch(`${API}${path}`, { cache: "no-store", headers: { cookie: cookies().toString() } });
    return { ok: res.ok, status: res.status, data: res.ok ? ((await res.json()) as T) : null };
  } catch { return { ok: false, status: 0, data: null }; }
}
