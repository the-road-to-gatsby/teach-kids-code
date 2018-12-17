require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.teachkidsco.de',
    title: 'Teach Kids Code',
    description:
      'Teack Kids Code: STEM Toys to make your children curious about coding. Everything from physical toys to online classes to teach your kids code ...',
    author: 'teachkidscode',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'teach-kids-code',
        short_name: 'starter',
        start_url: '/',
        background_color: '#a28efe',
        theme_color: '#a28efe',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
