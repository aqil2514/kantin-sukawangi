import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://kantin-sukawangi.vercel.app';
  
  const routes = [
    '/',
    '/about',
    '/cart',
    '/checkout',
    '/contact',
    '/products',
    '/auth',
  ];
  
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
