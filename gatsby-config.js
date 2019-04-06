module.exports = {
  siteMetadata: {
    title: 'NFCA NCAA Division 1 Softball Polls',
  },
  pathPrefix: "/nfca-polls",
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NFCA NCAA Division 1 Softball Polls`,
        short_name: `NFCA Polls`,
        start_url: `/`,
        background_color: `#009688`,
        theme_color: `#009688`,
        display: `browser`,
        icon: `src/images/icon.svg`,
        include_favicon: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-46762133-1',
      },
    },
  ],
}
