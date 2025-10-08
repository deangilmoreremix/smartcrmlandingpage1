import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  url?: string;
  canonicalUrl?: string;
  author?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
  schemaType?: 'Organization' | 'WebPage' | 'Event' | 'Product';
  schemaData?: Record<string, any>;
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title = 'Smart CRM - Transform Your Customer Relationships with AI',
  description = 'Smart CRM helps businesses build better customer relationships through AI-powered insights, seamless integrations, and intuitive workflow automation.',
  keywords = 'CRM, AI, sales automation, customer relationships, smart CRM, business software',
  ogType = 'website',
  ogImage = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600',
  url = 'https://smartcrm.com',
  canonicalUrl,
  author = 'Smart CRM',
  twitterCard = 'summary_large_image',
  twitterCreator = '@smartcrm',
  schemaType = 'Organization',
  schemaData
}) => {
  // Build basic schema.org data based on type
  const buildSchemaData = () => {
    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    
    const baseSchemaData = {
      '@context': 'https://schema.org',
      '@type': schemaType
    };
    
    switch (schemaType) {
      case 'Organization':
        return {
          ...baseSchemaData,
          name: 'Smart CRM',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          sameAs: [
            'https://twitter.com/smartcrm',
            'https://linkedin.com/company/smartcrm',
            'https://facebook.com/smartcrm'
          ],
          description,
          ...schemaData
        };
      case 'WebPage':
        return {
          ...baseSchemaData,
          name: title,
          description,
          url: canonicalUrl || baseUrl,
          ...schemaData
        };
      case 'Event':
        return {
          ...baseSchemaData,
          name: 'Smart CRM Masterclass - Free with Purchase',
          description,
          startDate: '2025-10-14T15:00:00-05:00',
          endDate: '2025-10-16T16:30:00-05:00',
          location: {
            '@type': 'VirtualLocation',
            url: baseUrl
          },
          image: ogImage,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/LimitedAvailability',
            validFrom: '2025-10-13T00:00:00-05:00'
          },
          performer: {
            '@type': 'Person',
            name: 'Dean Gilmore'
          },
          ...schemaData
        };
      case 'Product':
        return {
          ...baseSchemaData,
          name: 'Smart CRM',
          image: ogImage,
          description,
          brand: {
            '@type': 'Brand',
            name: 'Smart CRM'
          },
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '19',
            highPrice: '99',
            priceCurrency: 'USD',
            availability: 'https://schema.org/OnlineOnly'
          },
          ...schemaData
        };
      default:
        return {
          ...baseSchemaData,
          ...schemaData
        };
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Smart CRM" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterCreator} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(buildSchemaData())}
      </script>
      
      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#172554" />
    </Helmet>
  );
};

export default SEOMetaTags;