// const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

// console.log(`Using environment config: '${activeEnv}'`)

require(`dotenv`).config
// ({
//   // path: `.env.${activeEnv}`,
//   path: `.env.${process.env.NODE_ENV}`,
// })

module.exports = {
  siteMetadata: {
    title: `Gyldendal`,
    siteUrl: "https://app-gyld-webapp-prod.azurewebsites.net", // Domain of your website without pathPrefix. // Make sure siteUrl doesn`t have an ending forward slash
    image: `/src/images/Gyldendal_logo2.svg`,
    author: `@prosesspilotene`,
    siteLogo: `/src/images/Gyldendal_logo2.svg`, // Logo used for SEO and manifest.
    themeColor: `#c62828`, // Used for setting manifest and progress theme colors.
    backgroundColor: `#e0e0e0`, // Used for setting manifest background color.
    pathPrefix: `/`, // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
    siteDescription: `Gyldendal`, // Website description used for RSS feeds/meta description tag.
    siteRss: `/rss.xml`, // Path to the RSS file. // Make sure siteRss has a starting forward slash
    siteRssTitle: `Gyldendal RSS feed`, // Title of the RSS feed
    siteFBAppID: ``, // FB Application ID for using app insights... ENDRE DENNE!!
    disqusShortname: `Gyldendal`, // Disqus shortname.
    dateFromFormat: `YYYY-MM-DD`, // Date format used in the frontmatter.
    dateFormat: `DD/MM/YYYY`, // Date format for display.
    postsPerPage: 4, // Amount of posts displayed per listing page.
    userName: `Advanced User`, // Username to display in the author segment.
    userEmail: `AdvancedUser@example.com`, // Email used for RSS feed`s author segment
    userTwitter: ``, // Optionally renders "Follow Me" in the UserInfo segment.
    userLocation: `Oslo, Norge`, // User location to display in the author segment.
    userAvatar: `https://api.adorable.io/avatars/150/test.png`, // User avatar to display in the author segment.
    name: `fsdafsd`,
    userDescription:
      "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven`t seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
    // Links to social profiles/projects you want to display in the author segment/navigation bar.

    copyright: `Copyright © 2021. Advanced User`, // Copyright string for the footer of the website and RSS feed.
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        defaultDataLayer: {
          platform: `gatsby`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sentry`,
      options: {
        dsn: process.env.GATSBY_SENTRY_DSN,
        // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        environment: process.env.NODE_ENV,
        enabled: (() => [`production`, `stage`].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/minside/*`] },
    },

    `gatsby-plugin-postcss`,
    // Add Purge CSS AFTER other CSS Plugings!
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: [`whitelist`], // Don`t remove this selector
        // ignore: [`/ignored.css`, `prismjs/`, `docsearch.js/`], // Ignore files/folders
        // purgeOnly : [`components/`, `/main.css`, `bootstrap/`], // Purge only these files/folders
      },
    },

    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-react-next`,  @younes: Bruker vi denne til noe?
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
  
            allSitePage {
              nodes {
                path
              }
            }
        }`,
        resolveSiteUrl: ({ site, allSitePage }) => {
          //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map((node) => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `weekly`,
              priority: 0.7,
            }
          }),
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gyldendal`,
        short_name: `Gyldendal`,
        icon: `src/images/Gyldendal_logo2.svg`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
      },
      __key: `images`,
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        name: `BookJson`,
        path: `./src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        langKeyDefault: `nb`,
        prefixDefault: `true`,
        locales: `./src/i18n/react-i18next`,
        i18nextOptions: {
          ns: [`translation`, `404`],
        },
      },
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `nb`,
        configPath: require.resolve(`./src/i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        facebookPixel: {
          pixelId: "", // leave empty if you want to disable the tracker
          cookieName: "gyldendal-gdpr-facebook-pixel", // // here can you change the cookie name
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    // {
    //   resolve: "gatsby-plugin-guess-js",
    //   options: {
    //     // Find the view id in the GA admin in a section labeled "views"
    //     GAViewID: `G-FNMNCNL0RK`,
    //     // Add a JWT to get data from GA
    //     jwt: {
    //       client_email: `GOOGLE_SERVICE_ACCOUNT_EMAIL`,
    //       private_key: `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`,
    //     },
    //     minimumThreshold: 0.03,
    //     // The "period" for fetching analytic data.
    //     period: {
    //       startDate: new Date("2021-1-1"),
    //       endDate: new Date(),
    //     },
    //   },
    // },
  ],
}
