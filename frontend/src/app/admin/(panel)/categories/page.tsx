import { apiGet } from "@/lib/api.server";
import CategoryForm from "@/components/CategoryForm";
import ActionButton from "@/components/ActionButton";
import type { Category } from "@/lib/types";
export default async function Cats() {
  const r = await apiGet<Category[]>("/api/categories"); const list = r.data ?? [];
  return (<><h1 className="font-display text-3xl text-forest">Categories</h1>
    <div className="mt-6 flex"><CategoryForm /></div>
    {!r.ok ? <p role="alert" className="mt-8 text-red-800">Could not load categories.</p> : list.length === 0 && <p className="mt-8 text-soil">No categories yet.</p>}
    <ul className="mt-6 grid gap-3">{list.map(c => (<li key={c.id} className="bg-white border border-sand p-3 flex flex-wrap gap-2 items-center">
      <CategoryForm category={c} /><ActionButton url={`/api/admin/categories/${c.id}`} method="DELETE" label="Delete" danger confirmText={`Delete "${c.name}"? Its products become uncategorised.`} /></li>))}</ul></>);
}
