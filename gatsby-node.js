const path = require("path")
// const slash = require(`slash`)

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/minside/)) {
    page.matchPath = "/minside/*"

    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: [
              /BrowserStorage/,
              /tsblib.es6/,
              /AuthCache/,
              /UserAgentApplication/,
              /AuthService/,
              /CoockieConsentBanner/,
            ],
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
