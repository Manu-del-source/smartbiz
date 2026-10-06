import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://smartbiz365.site';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export type SEOProps = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  imageAlt?: string;
  breadcrumb?: string[];
};

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'SmartBiz',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-32x32.png`,
  email: 'hello@smartbiz365.site',
  telephone: '+254795787261',
  areaServed: { '@type': 'Country', name: 'Kenya' },
  address: { '@type': 'PostalAddress', addressLocality: 'Eldoret', addressCountry: 'KE' },
};

export default function SEO({ title, description, path, type = 'website', imageAlt = 'SmartBiz web design and software services in Kenya', breadcrumb }: SEOProps) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path.replace(/\\/$/, '')}`;
  const webPage = {
    '@type': type === 'article' ? 'Article' : 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };
  const breadcrumbSchema = breadcrumb?.length
    ? {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((name, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          item: index === 0 ? SITE_URL : canonical,
        })),
      }
    : null;
  const jsonLd = [
    { '@context': 'https://schema.org', ...organization },
    { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'SmartBiz', publisher: { '@id': `${SITE_URL}/#organization` } },
    { '@context': 'https://schema.org', ...webPage },
    ...(breadcrumbSchema ? [{ '@context': 'https://schema.org', ...breadcrumbSchema }] : []),
  ];

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="SmartBiz" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}
