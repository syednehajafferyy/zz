import Link from "next/link";
import type { Metadata } from "next";
import { apiGet } from "@/lib/api.server";
import type { Category, Product } from "@/lib/types";
export const metadata: Metadata = { title: "Our Seeds" };
export const dynamic = "force-dynamic";
export default async function Seeds({ searchParams }: { searchParams: { category?: string } }) {
  const cat = searchParams.category;
  const [c, p] = await Promise.all([apiGet<Category[]>("/api/categories"), apiGet<Product[]>(`/api/products${cat ? `?category=${encodeURIComponent(cat)}` : ""}`)]);
  const cats = c.data ?? [], products = p.data ?? [];
  const tab = (a: boolean) => `px-4 py-2 border ${a ? "bg-forest text-paper border-forest" : "border-sand hover:border-forest"} transition-colors`;
  return (<main className="px-6 md:px-16 py-16"><h1 className="font-display text-4xl text-forest">Our Seeds</h1>
    <nav aria-label="Categories" className="mt-8 flex gap-2 flex-wrap"><Link href="/seeds" className={tab(!cat)}>All</Link>
      {cats.map(x => <Link key={x.id} href={`/seeds?category=${x.slug}`} className={tab(cat === x.slug)}>{x.name}</Link>)}</nav>
    {!p.ok ? <p role="alert" className="mt-12 text-red-800">The catalogue could not be loaded right now. Please try again shortly.</p>
      : products.length === 0 ? <p className="mt-12 text-soil">No seeds are listed here yet. Please check back soon or contact us directly.</p>
      : <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{products.map(x => (<li key={x.id} className="group border border-sand bg-white">
        <div className="aspect-[4/3] overflow-hidden bg-sand">{x.image && <img src={x.image} alt={x.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}</div>
        <div className="p-5"><p className="text-sm text-olive">{x.category?.name ?? "Uncategorised"}</p><h2 className="font-display text-xl mt-1">{x.name}</h2>
          <p className="mt-2 text-soil line-clamp-3">{x.description}</p><Link href={`/seeds/${x.slug}`} className="navlink inline-block mt-4 text-forest">View Details</Link></div></li>))}</ul>}</main>);
}
