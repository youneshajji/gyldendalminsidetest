const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\GIT\\Gyldendal\\minside\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-tsx": hot(preferDefault(require("C:\\GIT\\Gyldendal\\minside\\src\\pages\\404.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("C:\\GIT\\Gyldendal\\minside\\src\\pages\\index.tsx"))),
  "component---src-pages-minside-js": hot(preferDefault(require("C:\\GIT\\Gyldendal\\minside\\src\\pages\\minside.js")))
}

