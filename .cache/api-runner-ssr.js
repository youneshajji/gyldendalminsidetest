var plugins = [{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"includeInDevelopment":false,"defaultDataLayer":{"type":"object","value":{"platform":"gatsby"}},"routeChangeEventName":"gatsby-route-change"},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"exclude":[],"query":"\n          {\n            site {\n              siteMetadata {\n                siteUrl\n              }\n            }\n  \n            allSitePage {\n              nodes {\n                path\n              }\n            }\n        }","output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Gyldendal","short_name":"Gyldendal","icon":"src/images/Gyldendal_logo2.svg","start_url":"/","background_color":"#f7f0eb","theme_color":"#a2466c","display":"standalone","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"76949a145ffd2ba1160f5bf8e3d650eb"},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-theme-i18n-react-i18next/gatsby-ssr'),
      options: {"plugins":[],"langKeyDefault":"nb","prefixDefault":"true","locales":"./src/i18n/react-i18next","i18nextOptions":{"ns":["translation","404"]}},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-theme-i18n/gatsby-ssr'),
      options: {"plugins":[],"defaultLang":"nb","configPath":"C:\\GIT\\Gyldendal\\minside\\src\\i18n\\config.json"},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/node_modules/gatsby-plugin-gdpr-cookies/gatsby-ssr'),
      options: {"plugins":[],"facebookPixel":{"pixelId":"","cookieName":"gyldendal-gdpr-facebook-pixel"},"environments":["production","development"]},
    },{
      plugin: require('C:/GIT/Gyldendal/minside/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
