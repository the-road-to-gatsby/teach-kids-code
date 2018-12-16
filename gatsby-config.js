module.exports = {
  siteMetadata: {
    title: 'Teach Kids Code',
    description:
      'Teack Kids Code: STEM Toys to make your children curious about coding. Everything from physical toys to online classes to teach your kids code.',
    author: '@rwieruch',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-65599459-11',
        anonymize: true,
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
