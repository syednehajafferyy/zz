import Link from "next/link";
import { apiGet } from "@/lib/api.server";
import ActionButton from "@/components/ActionButton";
import type { Product } from "@/lib/types";
export default async function Products() {
  const r = await apiGet<Product[]>("/api/admin/products"); const list = r.data ?? [];
  return (<><div className="flex justify-between items-center"><h1 className="font-display text-3xl text-forest">Products</h1><Link href="/admin/products/new" className="bg-forest text-paper px-4 py-2">Add product</Link></div>
    {!r.ok ? <p role="alert" className="mt-8 text-red-800">Could not load products.</p> : list.length === 0 ? <p className="mt-8 text-soil">No products yet. Add your first product.</p> :
      <ul className="mt-6 grid gap-3">{list.map(p => (<li key={p.id} className="bg-white border border-sand p-4 flex flex-wrap items-center gap-3 justify-between">
        <div><p className="font-medium">{p.name}</p><p className="text-sm text-soil">{p.category?.name ?? "Uncategorised"} | {p.published ? "Published" : "Draft"}</p></div>
        <div className="flex gap-4 text-sm"><Link href={`/admin/products/${p.id}`} className="underline">Edit</Link>
          <ActionButton url={`/api/admin/products/${p.id}`} method="PATCH" body={{ published: !p.published }} label={p.published ? "Unpublish" : "Publish"} />
          <ActionButton url={`/api/admin/products/${p.id}`} method="DELETE" label="Delete" danger confirmText={`Delete "${p.name}"?`} /></div></li>))}</ul>}</>);
}
