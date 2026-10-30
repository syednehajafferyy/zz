const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) throw new Error("NEXT_PUBLIC_API_URL is not set. Copy .env.example to .env.local and set the backend URL.");
export default {
  poweredByHeader: false,
  // The browser calls same-origin /api/*; Next forwards it to the backend. This keeps the admin cookie first-party.
  async rewrites() { return [{ source: "/api/:path*", destination: `${API.replace(/\/$/, "")}/api/:path*` }]; },
  images: { remotePatterns: [{ protocol: "https", hostname: "**.public.blob.vercel-storage.com" }] },
};
