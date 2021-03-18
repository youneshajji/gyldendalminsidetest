/*eslint-disable*/
require("./src/styles/global.css")

const React = require("react")
const Layout = require("./src/components/Layout/MainLayout").default

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

// Application Insights script starts here
// https://www.olivercoding.com/2019-04-04-gatsby-azure-appinsights/
// let injectedScript = false

// export const onInitialClientRender = () => {
//   function addJS(jsCode) {
//     var s = document.createElement(`script`)
//     s.type = `text/javascript`
//     s.innerText = jsCode
//     document.getElementsByTagName(`head`)[0].appendChild(s)
//   }
//   if (!injectedScript) {
//     addJS(`
//     var appInsights = window.appInsights || function (a) {
//         function b(a) { c[a] = function () { var b = arguments; c.queue.push(function () { c[a].apply(c, b) }) } } var c = { config: a }, d = document, e = window; setTimeout(function () { var b = d.createElement("script"); b.src = a.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js", d.getElementsByTagName("script")[0].parentNode.appendChild(b) }); try { c.cookie = d.cookie } catch (a) { } c.queue = []; for (var f = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; f.length;)b("track" + f.pop()); if (b("setAuthenticatedUserContext"), b("clearAuthenticatedUserContext"), b("startTrackEvent"), b("stopTrackEvent"), b("startTrackPage"), b("stopTrackPage"), b("flush"), !a.disableExceptionTracking) { f = "onerror", b("_" + f); var g = e[f]; e[f] = function (a, b, d, e, h) { var i = g && g(a, b, d, e, h); return !0 !== i && c["_" + f](a, b, d, e, h), i } } return c
//     }({
//         instrumentationKey: "e015041a-25ce-4332-9feb-5d8d20801f8e"
//     });

//     window.appInsights = appInsights, appInsights.queue && 0 === appInsights.queue.length && appInsights.trackPageView();
//       `)
//     injectedScript = true
//   }
// }

// export const onRouteUpdate = ({ location, prevLocation }) => {
//   window.appInsights.trackPageView()
// }
// Application Insights script ends here.
