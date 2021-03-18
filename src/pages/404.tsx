import * as React from "react"
import { Link } from "gatsby"

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>Siden finnes ikke</h1>
      <p style={paragraphStyles}>
        Beklager{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        Vi kunne ikke finne det du er ute etter.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Gå hjem</Link>.
      </p>
    </main>
  )
}

export default IndexPage
