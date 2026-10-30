import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api.server";
import ProductForm from "@/components/ProductForm";
import type { Category, Product } from "@/lib/types";
export default async function Edit({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const [c, p] = await Promise.all([apiGet<Category[]>("/api/categories"), isNew ? Promise.resolve(null) : apiGet<Product>(`/api/admin/products/${params.id}`)]);
  if (p && p.status === 404) notFound();
  if (p && !p.ok) return <p role="alert" className="text-red-800">Could not load this product.</p>;
  return <><h1 className="font-display text-3xl text-forest mb-6">{p ? "Edit product" : "Add product"}</h1><ProductForm product={p?.data ?? undefined} categories={c.data ?? []} /></>;
}
