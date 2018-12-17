import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

function SEO({ title, description, keywords = [], lang = 'en', meta = [] }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaTitle = title || data.site.siteMetadata.title;
        const metaDescription =
          description || data.site.siteMetadata.description;

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={metaTitle}
            meta={[
              {
                name: 'google-site-verification',
                content: process.env.GATSBY_GOOGLE_SITE_VERIFICATION,
              },
              {
                name: 'description',
                content: metaDescription,
              },
              // Facebook
              {
                property: 'og:title',
                content: metaTitle,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              { property: 'og:url', content: data.site.siteMetadata.siteUrl },
              {
                property: 'og:image',
                content: `${data.site.siteMetadata.siteUrl}/facebook.png`,
              },
              // Twitter
              {
                name: 'twitter:title',
                content: metaTitle,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:card',
                content: 'summary_large_image',
              },
              {
                name: 'twitter:image:src',
                content: `${data.site.siteMetadata.siteUrl}/twitter.png`,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;
