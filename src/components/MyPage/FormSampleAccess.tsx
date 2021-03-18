import { navigate } from 'gatsby'
import React from 'react'
import SEO from '../SEO/SEO'
import SampleAccess from './SampleAccess'

const Books = [
    {
        title: "Multi 1A, Lærernes bok",
        ISBN: 9876543212343,
        subTitle: "Undertittel",
        inStorage: true,
        expectedIn: "",
        allreadySent: false,
        expiredDate: "04.05.21",
        lang: "Norsk, Bokmål",
    },
    {
        title: "Multi 2A",
        ISBN: 9876543212342,
        subTitle: "Undertittel",
        inStorage: true,
        expectedIn: "",
        allreadySent: true,
        expiredDate: "04.05.21",
        lang: "Norsk, Bokmål",
    },
    {
        title: "Multi 5A, Elevbok",
        ISBN: "9876543212341",
        subTitle: "Undertittel",
        inStorage: false,
        expectedIn: "04.05.21",
        allreadySent: false,
        expiredDate: "04.05.21",
        lang: "Norsk, Bokmål",
    },
]

const FormSampleAccess = () => {

    const onSend = () => {
        // TODO: check if assessmentCopy or SampleAccess from url param, navigate to the respective page
        return navigate("/minside/ordre")
    }

    return (
        <>
            {/* Header tag from */}
            {/* Main here */}
            <div className="flex h-screen">
                <SEO title="Bestilling" description="Gyldendal sin hjem side." />
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 m-auto ">
                    <div className="">
                        <div className="">
                            <h2 className="text-3xl font-bold pb-3">Forespørsel om vurderingseksemplar av Multi</h2>
                            <h5 className="text-md">
                                Vi gjør oppmerksom på at det sendes et begrenset antall vurderingseksemplarer til hver skole.
              </h5>
                        </div>
                        <div className="pt-10">
                            <h3 className="font-semibold">Velg vurderingseksemplar</h3>
                            <div className="">
                                {Books.map((data) => (
                                    <SampleAccess {...data} />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-start justify-end">
                            <button
                                onclick="location.href='http://www.gyldendal.no'"
                                className="h-10 m-2 underline bg-transparent text-black font-semibold hover:text-gray py-2 px-6 borde-none"
                            >
                                Abryt
          </button>
                            <button
                                onClick={onSend}
                                className="h-10 m-2 bg-red-500 hover:bg-red-800 text-white font-semibold hover:text-white py-2 px-6 border border-red-500 rounded-2xl">
                                Send
              </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormSampleAccess
