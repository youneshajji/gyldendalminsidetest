import React from "react"

export const emailNonEditable = "Obs: Denne er ikke redigerbar"

export const EmailSupportFeide = () => {
  return (
    <p className="pt-4 text-xs italic">
      Informasjonen er hentet fra Feide. Stemmer ikke skolen? <br /> Ta kontakt med din lokale{" "}
      <a href="https://www.feide.no/brukerstotte" className="underline">
        brukerstøtte
      </a>{" "}
      hos Feide for å oppdatere til riktig skole.{" "}
    </p>
  )
}
