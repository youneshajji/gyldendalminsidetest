/*eslint-disable*/
const React = require("react")
const Layout = require("./src/components/Layout/MainLayout").default

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
