const tailwindcss = require(`tailwindcss`)
// import tailwindcss from 'tailwindcss'

// TODO: https://emortlock.github.io/tailwind-react-ui/#installation
// import { getWhitelist, TailwindReactExtractor } from 'tailwind-react-ui';

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
    }),
  ],
}
